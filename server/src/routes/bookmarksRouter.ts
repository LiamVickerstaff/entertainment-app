import express, { type Request, type Response } from "express";
import { prisma } from "../lib/prisma";

const router = express.Router();

router.post("/add", async (req: Request, res: Response) => {
  const userId = req.userId;
  let bookmarkToAdd = req.body.newBookmark;

  if (!bookmarkToAdd) {
    return res
      .status(400)
      .json({ error: "missing new bookmark to add in request body" });
  }

  if (!userId) {
    return res
      .status(400)
      .json({ error: "No userId passed to /bookmark/add route" });
  }

  bookmarkToAdd = { ...bookmarkToAdd, userId };

  let newBookmark;

  try {
    newBookmark = await prisma.bookmark.create({
      data: bookmarkToAdd,
    });
  } catch (error) {
    console.error("Database error, prisma failed to save new bookmark:", error);
    return res.status(500).json({ error: "failed to save new bookmark" });
  }

  return res.status(200).json({
    message: "successfully added new bookmark",
    bookmark: newBookmark,
  });
});

router.delete("/remove/:mediaId", async (req: Request, res: Response) => {
  const mediaId = Number(req.params.mediaId); // convert to number since params are always strings
  const userId = req.userId;

  if (isNaN(mediaId))
    // check that mediaId exists
    return res
      .status(400)
      .json({ error: "Server did not receive mediaId for deleting bookmark" });

  if (!userId) {
    return res
      .status(400)
      .json({ error: "No userId passed to /bookmark/remove route" });
  }

  try {
    const removedBookmark = await prisma.bookmark.delete({
      where: {
        userId_externalId: {
          userId,
          externalId: mediaId,
        },
      },
    });

    return res.status(200).json({
      message: "Successfully deleted bookmark",
      removedBookmarkId: removedBookmark.externalId,
    });
  } catch (error) {
    const e = error as any;
    if (e.code === "P2025") {
      console.error("Did not find bookmark when trying to delete:", e);
      return res.status(404).json({ error: "Bookmark not found" });
    }
    console.error("failed to remove bookmark: ", e);
    return res.status(500).json({ error: "failed to remove bookmark" });
  }
});

export default router;
