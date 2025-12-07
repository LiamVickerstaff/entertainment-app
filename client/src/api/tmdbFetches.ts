import type {
  MixedMediaType,
  MovieDataType,
  TvDataType,
} from "../types/mediaDataTypes";
import { apiFetchWrapper } from "./fetchWrapper";

export const fetchTrendingMedia = async () => {
  const data: MixedMediaType[] = await apiFetchWrapper("/tmdb/all/trending", {
    method: "GET",
    credentials: "include",
  });

  return data;
};

export const fetchRecommendedMedia = async () => {
  const data: MixedMediaType[] = await apiFetchWrapper(
    "/tmdb/all/recommended",
    {
      method: "GET",
      credentials: "include",
    }
  );

  return data;
};

export const fetchTrendingMovies = async () => {
  const data: MovieDataType[] = await apiFetchWrapper("/tmdb/movies/trending", {
    method: "GET",
    credentials: "include",
  });

  return data;
};

export const fetchTrendingTvShows = async () => {
  const data: TvDataType[] = await apiFetchWrapper("/tmdb/tv/trending", {
    method: "GET",
    credentials: "include",
  });

  return data;
};
