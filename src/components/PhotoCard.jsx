import { LazyLoadImage } from "react-lazy-load-image-component";
/**
 * Individual photo item component for the grid
 * Memoized to prevent unnecessary re-renders
 */
const PhotoCard = ({ photo, onClick }) => {
  const thumbnailUrl = photo.download_url;
  const authorName = photo.author || "Unknown Author";

  const handleClick = () => {
    onClick(photo.id);
  };

  return (
    <div
      className="group cursor-pointer bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl"
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
        <LazyLoadImage
          src={thumbnailUrl}
          alt={`Photo by ${authorName}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900 truncate">
          Photo by {authorName}
        </h3>
      </div>
    </div>
  );
};

export default PhotoCard;
