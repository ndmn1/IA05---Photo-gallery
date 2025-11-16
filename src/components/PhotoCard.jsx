import { memo } from "react";
import { API } from "../constants/paths";

/**
 * Individual photo item component for the grid
 * Memoized to prevent unnecessary re-renders
 */
const PhotoCard = memo(({ photo, onClick }) => {
  const thumbnailUrl = photo.download_url;
  const authorName = photo.author || "Unknown Author";

  const handleClick = () => {
    onClick(photo.id);
  };


  return (
    <div
      className="group cursor-pointer bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleClick();
        }
      }}
    >
      <div className="relative overflow-hidden aspect-square">
        <img
          src={thumbnailUrl}
          alt={`Photo by ${authorName}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900 truncate">
          Photo by {authorName}
        </h3>
      </div>
    </div>
  );
});

PhotoCard.displayName = "PhotoCard";

export default PhotoCard;
