import { memo } from "react";
import PhotoCard from "./PhotoCard";

/**
 * Photo grid component with responsive layout
 * Memoized to prevent unnecessary re-renders
 */
const PhotoGrid = memo(({ photos, onPhotoClick, loading }) => {
  if (!photos || photos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No photos to display</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6">
      {photos.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} onClick={onPhotoClick} />
      ))}

      {loading && (
        <div className="col-span-full text-center py-8">
          <div className="inline-flex items-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="text-gray-600">Loading more photos...</span>
          </div>
        </div>
      )}
    </div>
  );
});

PhotoGrid.displayName = "PhotoGrid";

export default PhotoGrid;
