import type { MediaData, MixedMediaType } from "../types/mediaDataTypes";

export function normalizeContentData(mediaList: MixedMediaType[]): MediaData[] {
  return mediaList.map((media) => {
    const title = "title" in media ? media.title : media.name;
    const releaseDate =
      "release_date" in media ? media.release_date : media.first_air_date;

    return {
      externalId: media.id,
      title,
      posterPath: media.poster_path,
      releaseDate,
      mediaType: media.media_type as "movie" | "tv",
      adult: media.adult,
    };
  });
}
