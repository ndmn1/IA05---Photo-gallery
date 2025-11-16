// Route paths for the application
export const PATHS = {
  HOME: "/",
  PHOTOS: "/photos",
  PHOTO_DETAIL: "/photos/:id",
};

// API endpoints
export const API = {
  PHOTOS_LIST: "https://picsum.photos/v2/list",
  PHOTO_INFO: (id) => `https://picsum.photos/id/${id}/info`,
};

// Pagination settings
export const PAGINATION = {
  PHOTOS_PER_PAGE: 20,
  DEFAULT_PAGE: 1,
};
