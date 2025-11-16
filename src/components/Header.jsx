import { memo } from "react";

/**
 * Header component for the application
 */
const Header = memo(({ title, showBackButton = false, onBack }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            {showBackButton && onBack && (
              <button
                onClick={onBack}
                className="inline-flex items-center p-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                aria-label="Go back"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <span className="ml-1">Back</span>
              </button>
            )}
            {!showBackButton && !onBack && (
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                {title}
              </h1>
            )}
          </div>
          {!showBackButton && !onBack && (
            <div className="text-sm text-gray-500">Powered by Lorem Picsum</div>
          )}
        </div>
      </div>
    </header>
  );
});

Header.displayName = "Header";

export default Header;
