import { memo } from "react";

/**
 * Error display component with retry functionality
 */
const ErrorMessage = memo(({ message, onRetry, showRetry = true }) => {
  return (
    <div className="text-center py-12">
      <div className="max-w-md mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
            <svg
              className="w-6 h-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <h3 className="text-lg font-medium text-red-900 mb-2">
            Oops! Something went wrong
          </h3>

          <p className="text-red-700 text-sm mb-4">
            {message || "An unexpected error occurred. Please try again."}
          </p>

          {showRetry && onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

ErrorMessage.displayName = "ErrorMessage";

export default ErrorMessage;
