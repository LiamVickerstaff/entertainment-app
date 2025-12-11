import type { MediaContentType, MixedMediaType } from "../types/mediaDataTypes";

export function formatContentData(
  mediaList: MixedMediaType[]
): MediaContentType[] {
  return mediaList.map((media) => {
    const title = "title" in media ? media.title : media.name;
    const releaseDate =
      "release_date" in media ? media.release_date : media.first_air_date;
    const mediaType = "title" in media ? "movie" : "tv";

    return {
      externalId: media.id,
      title: title || "N/A",
      posterPath: media.poster_path || "N/A",
      releaseDate: releaseDate || "N/A",
      mediaType: mediaType,
      adult: media.adult || false,
    };
  });
}
