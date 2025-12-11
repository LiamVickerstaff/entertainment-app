import express, { type Request, type Response } from "express";
import { cacheThenApiFetch } from "../utils/cacheUtils";

const tmdbRouter = express.Router();

tmdbRouter.get("/all/trending", async (req: Request, res: Response) => {
  const CACHE_KEY = "all_trending";

  const fetchRequests = [
    fetch(`https://api.themoviedb.org/3/trending/movie/week?language=en-US`, {
      headers: {
        Authorization: `Bearer ${process.env.TMBD_API_ACCESS_TOKEN}`,
        accept: "application/json",
      },
    }),
    fetch(`https://api.themoviedb.org/3/trending/tv/week?language=en-US`, {
      headers: {
        Authorization: `Bearer ${process.env.TMBD_API_ACCESS_TOKEN}`,
        accept: "application/json",
      },
    }),
  ];

  const redisTTL = 60 * 60; // 1 hour, ttl in seconds

  try {
    const data = await cacheThenApiFetch(CACHE_KEY, fetchRequests, redisTTL);
    res.status(200).json(data);
  } catch (error) {
    console.error("Route error at /all/trending: ", error);
    res.status(500).json({
      error:
        "Server error: failed to find all trending media data. Please try again later.",
    });
  }
});

tmdbRouter.get("/all/recommended", async (req: Request, res: Response) => {
  const CACHE_KEY = "all_recommended";

  const fetchRequests = [
    fetch(
      `https://api.themoviedb.org/3/trending/movie/week?language=en-US&page=2`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TMBD_API_ACCESS_TOKEN}`,
          accept: "application/json",
        },
      }
    ),
    fetch(
      `https://api.themoviedb.org/3/trending/tv/week?language=en-US&page=2`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TMBD_API_ACCESS_TOKEN}`,
          accept: "application/json",
        },
      }
    ),
  ];

  const redisTTL = 60 * 60; // 1 hour, ttl in seconds

  try {
    const data = await cacheThenApiFetch(CACHE_KEY, fetchRequests, redisTTL);
    return res.status(200).json(data);
  } catch (error) {
    console.error("Route error at /all/recommended:", error);
    return res.status(500).json({
      error:
        "Server error: failed to find all recommended media data. Please try again later.",
    });
  }
});

tmdbRouter.get("/movies/trending", async (req: Request, res: Response) => {
  const CACHE_KEY = "trending_movies";

  const fetchRequests = [
    fetch(`https://api.themoviedb.org/3/trending/movie/week?language=en-US`, {
      headers: {
        Authorization: `Bearer ${process.env.TMBD_API_ACCESS_TOKEN}`,
        accept: "application/json",
      },
    }),
  ];

  const redisTTL = 60 * 60; // 1 hour

  try {
    const data = await cacheThenApiFetch(CACHE_KEY, fetchRequests, redisTTL);
    return res.status(200).json(data);
  } catch (error) {
    console.error("Route error at /movies/trending: ", error);
    return res
      .status(500)
      .json({ error: "Server error: unable to fetch trending movies" });
  }
});

tmdbRouter.get("/tv/trending", async (req: Request, res: Response) => {
  const CACHE_KEY = "tv_trending";

  const fetchRequests = [
    fetch(`https://api.themoviedb.org/3/trending/tv/week?language=en-US`, {
      headers: {
        Authorization: `Bearer ${process.env.TMBD_API_ACCESS_TOKEN}`,
        accept: "application/json",
      },
    }),
  ];

  const redisTTL = 60 * 60; // 1 hour

  try {
    const data = await cacheThenApiFetch(CACHE_KEY, fetchRequests, redisTTL);
    return res.status(200).json(data);
  } catch (error) {
    console.error("Route error at /tv/trending: ", error);
    return res
      .status(500)
      .json({ error: "Server failed to fetch trending tv shows" });
  }
});

tmdbRouter.get(
  "/all/search/:searchQuery",
  async (req: Request, res: Response) => {
    const { searchQuery } = req.params;

    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/search/multi?query=${searchQuery}&language=en-US&page=1'`,
        {
          headers: {
            Authorization: `Bearer ${process.env.TMBD_API_ACCESS_TOKEN}`,
            accept: "application/json",
          },
        }
      );
      const jsonData = await data.json();
      return res.status(200).json(jsonData.results);
    } catch (error) {
      console.error(`Route error at /movies/search/${searchQuery} `, error);
      return res
        .status(500)
        .json({ error: "Server error: unable to fetch /movie/search" });
    }
  }
);
tmdbRouter.get(
  "/movie/search/:searchQuery",
  async (req: Request, res: Response) => {
    const { searchQuery } = req.params;

    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&language=en-US&page=1'`,
        {
          headers: {
            Authorization: `Bearer ${process.env.TMBD_API_ACCESS_TOKEN}`,
            accept: "application/json",
          },
        }
      );
      const jsonData = await data.json();
      return res.status(200).json(jsonData.results);
    } catch (error) {
      console.error(`Route error at /movies/search/${searchQuery} `, error);
      return res
        .status(500)
        .json({ error: "Server error: unable to fetch /movie/search" });
    }
  }
);

tmdbRouter.get(
  "/tv/search/:searchQuery",
  async (req: Request, res: Response) => {
    const { searchQuery } = req.params;

    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/search/tv?query=${searchQuery}&language=en-US&page=1'`,
        {
          headers: {
            Authorization: `Bearer ${process.env.TMBD_API_ACCESS_TOKEN}`,
            accept: "application/json",
          },
        }
      );
      const jsonData = await data.json();
      return res.status(200).json(jsonData.results);
    } catch (error) {
      console.error(`Route error at /tv/search/${searchQuery} `, error);
      return res
        .status(500)
        .json({ error: "Server error: unable to fetch /tv/search" });
    }
  }
);

export default tmdbRouter;
