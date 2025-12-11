import { useBookmarksStore } from "../../stores/useBookmarksStore";
import { fetchMoviesBySearch } from "../../api/tmdbFetches";
import { useSearch } from "../../hooks/useSearch";
import DisplayContentGroup from "../../components/DisplayContentGroup/DisplayContentGroup";

export default function Movies({ title }: { title: string }) {
  const { movieBookmarks } = useBookmarksStore();

  const {
    data: movieData,
    loading,
    error,
  } = useSearch("movie", fetchMoviesBySearch, movieBookmarks);

  return (
    <DisplayContentGroup
      title={title}
      contentData={movieData}
      loading={loading}
      error={error}
    />
  );
}
