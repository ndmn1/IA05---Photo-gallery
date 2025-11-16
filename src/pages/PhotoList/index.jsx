import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { usePhotoList } from "../../hooks/usePhotoList";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import PhotoGrid from "../../components/PhotoGrid";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage";
import Header from "../../components/Header";

/**
 * Photo List page component with infinite scroll
 */
const PhotoListPage = () => {
  const navigate = useNavigate();
  const {
    photos,
    loading,
    error,
    hasMore,
    hasPhotos,
    isInitialLoading,
    loadMore,
    refresh,
  } = usePhotoList();

  // Set up infinite scroll
  useInfiniteScroll(loadMore, hasMore, loading);

  // Handle photo click navigation
  const handlePhotoClick = useCallback(
    (photoId) => {
      navigate(`/photos/${photoId}`);
    },
    [navigate]
  );

  // Handle error retry
  const handleRetry = useCallback(() => {
    refresh();
  }, [refresh]);

  if (isInitialLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="Photo Gallery" />
        <LoadingSpinner text="Loading photos..." />
      </div>
    );
  }

  if (error && !hasPhotos) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="Photo Gallery" />
        <ErrorMessage message={error} onRetry={handleRetry} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Photo Gallery" />

      <main className="max-w-7xl mx-auto">
        {hasPhotos ? (
          <>
            <PhotoGrid
              photos={photos}
              onPhotoClick={handlePhotoClick}
              loading={loading}
            />

            {!hasMore && (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  You've reached the end of the gallery
                </p>
              </div>
            )}

            {error && (
              <div className="px-6 pb-6">
                <ErrorMessage
                  message="Failed to load more photos"
                  onRetry={handleRetry}
                />
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No photos available</p>
            <button
              onClick={handleRetry}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default PhotoListPage;
