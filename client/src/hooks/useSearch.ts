import { useEffect, useState } from "react";
import { formatContentData } from "../utils/tmbdUtils";
import { useLoadContent } from "./useLoadContent";
import { useLocation, useSearchParams } from "react-router-dom";
import type { MediaContentType, MixedMediaType } from "../types/mediaDataTypes";

export const useSearch = (
  contentType: "trending" | "recommended" | "movie" | "tv",
  fetchRequest: (query: string) => Promise<MixedMediaType[]>,
  bookmarksState: MediaContentType[]
) => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const { loadContent, error } = useLoadContent();
  const [data, setData] = useState<MediaContentType[]>([]);
  const searchQuery = searchParams.get("q")?.toLowerCase() ?? "";

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    try {
      if (location.pathname === "/bookmarks") {
        (async () => {
          console.log("calling callBookmarkSearch");
          try {
            if (!searchQuery) {
              setData(bookmarksState);
              return;
            }
            setData(
              bookmarksState.filter((b: MediaContentType) =>
                b.title.toLowerCase().includes(searchQuery.toLocaleLowerCase())
              )
            );
          } catch (error) {
            console.error(
              "callBookmarkSearch failed, did not search and set bookmark state properly:",
              error
            );
          }
        })();

        return;
      } else {
        (async () => {
          console.log("calling callRegularSearch");
          try {
            if (!searchQuery) {
              loadContent(contentType, setData);
              return;
            }
            const searchResult = await fetchRequest(searchQuery);
            console.log("search result inside useSearch:", searchResult);
            setData(formatContentData(searchResult) as MediaContentType[]);
          } catch (error) {
            console.error(
              "callRegularSearch failed, did not fetch or set searched content properly:",
              error
            );
          }
        })();
      }
    } catch (error) {
      console.error("Error inside useSearch hook: ", error);
    } finally {
      setLoading(false);
    }
    console.log("current data after search:", data);
  }, [location.pathname, searchQuery, contentType, fetchRequest]);

  return { data, loading, error };
};
