import { useState, useEffect, useCallback, useMemo } from "react";
import { API, PAGINATION } from "../constants/paths";

/**
 * Custom hook for managing photo list with infinite scroll
 */
export const usePhotoList = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(PAGINATION.DEFAULT_PAGE);

  const fetchPhotos = useCallback(async (pageNum = 1, reset = false) => {
    try {
      setLoading(true);
      setError(null);

      const url = `${API.PHOTOS_LIST}?page=${pageNum}&limit=${PAGINATION.PHOTOS_PER_PAGE}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newPhotos = await response.json();

      if (newPhotos.length === 0) {
        setHasMore(false);
      } else {
        setPhotos((prevPhotos) =>
          reset ? newPhotos : [...prevPhotos, ...newPhotos]
        );
        setPage(pageNum);

        // Check if we got fewer photos than requested, indicating end of list
        if (newPhotos.length < PAGINATION.PHOTOS_PER_PAGE) {
          setHasMore(false);
        }
      }
    } catch (err) {
      setError(err.message);
      console.error("Error fetching photos:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load more photos (for infinite scroll)
  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchPhotos(page + 1, false);
    }
  }, [loading, hasMore, page, fetchPhotos]);



  // Initial load
  useEffect(() => {
    fetchPhotos(PAGINATION.DEFAULT_PAGE, true);
  }, [fetchPhotos]);

  // Memoized values
  const hasPhotos = useMemo(() => photos.length > 0, [photos.length]);
  const isInitialLoading = useMemo(
    () => loading && photos.length === 0,
    [loading, photos.length]
  );

  return {
    photos,
    loading,
    error,
    hasMore,
    hasPhotos,
    isInitialLoading,
    loadMore,
  };
};
