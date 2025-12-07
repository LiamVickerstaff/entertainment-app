export interface GenericMediaType {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export interface MovieDataType extends GenericMediaType {
  original_title: string;
  release_date: string;
  title: string;
  video: boolean;
}

export interface TvDataType extends GenericMediaType {
  first_air_date: string;
  name: string;
  origin_country: string[];
  original_name: string;
}

export type MixedMediaType = MovieDataType | TvDataType;
