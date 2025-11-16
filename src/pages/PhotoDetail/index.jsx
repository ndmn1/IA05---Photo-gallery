import { useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePhotoDetail } from "../../hooks/usePhotoDetail";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage";
import Header from "../../components/Header";
import { LazyLoadImage } from "react-lazy-load-image-component";

/**
 * Photo Detail page component
 */
const PhotoDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { photo, loading, error, retry } = usePhotoDetail(id);

  // Handle back navigation
  const handleBack = useCallback(() => {
    navigate("/photos");
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="Photo Detail" showBackButton onBack={handleBack} />
        <LoadingSpinner text="Loading photo details..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="Photo Detail" showBackButton onBack={handleBack} />
        <ErrorMessage message={error} onRetry={retry} />
      </div>
    );
  }

  if (!photo) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="Photo Detail" showBackButton onBack={handleBack} />
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Photo not found</p>
          <button
            onClick={handleBack}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Gallery
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title={photo.title} showBackButton onBack={handleBack} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Photo Image */}
          <div className="relative">
            <LazyLoadImage
              src={photo.downloadUrl}
              alt={photo.title}
              className="w-full h-auto max-h-[70vh] object-contain bg-gray-100"
              loading="lazy"
            />
          </div>

          {/* Photo Information */}
          <div className="p-6">
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {photo.title}
                </h2>
                <p className="text-gray-600">{photo.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
                    Author
                  </h3>
                  <p className="text-lg text-gray-900">{photo.author}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
                    Original Dimensions
                  </h3>
                  <p className="text-lg text-gray-900">
                    {photo.width} × {photo.height} pixels
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={photo.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  See Original Picture
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PhotoDetailPage;
