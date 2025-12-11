import { useBookmarksStore } from "../../stores/useBookmarksStore";
import { fetchTvBySearch } from "../../api/tmdbFetches";
import { useSearch } from "../../hooks/useSearch";
import DisplayContentGroup from "../../components/DisplayContentGroup/DisplayContentGroup";

export default function TvShows({ title }: { title: string }) {
  const { tvBookmarks } = useBookmarksStore();

  const {
    data: tvShowData,
    loading,
    error,
  } = useSearch("tv", fetchTvBySearch, tvBookmarks);

  return (
    <DisplayContentGroup
      title={title}
      contentData={tvShowData}
      loading={loading}
      error={error}
    />
  );
}
