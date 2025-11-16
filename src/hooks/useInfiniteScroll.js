import { useState, useEffect, useCallback } from "react";

/**
 * Custom hook for managing infinite scroll behavior
 */
export const useInfiniteScroll = (loadMore, hasMore, loading) => {
  const [isFetching, setIsFetching] = useState(false);

  const handleScroll = useCallback(() => {
    // Calculate how close to the bottom we are
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.offsetHeight;

    // Trigger load when within 100px of the bottom
    const threshold = 100;
    const distanceFromBottom = documentHeight - (scrollTop + windowHeight);

    if (distanceFromBottom > threshold) {
      return;
    }

    if (hasMore && !loading && !isFetching) {
      setIsFetching(true);
    }
  }, [hasMore, loading, isFetching]);

  // Load more data when fetching is triggered
  useEffect(() => {
    if (!isFetching) return;

    const fetchMoreData = async () => {
      console.log("Fetching more data...");
      await loadMore();
      setIsFetching(false);
    };

    fetchMoreData();
  }, [isFetching, loadMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return { isFetching };
};
