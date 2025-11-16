import { useState, useEffect, useCallback, useMemo } from "react";
import { API } from "../constants/paths";

/**
 * Custom hook for managing individual photo details
 */
export const usePhotoDetail = (photoId) => {
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch photo details from API
  const fetchPhotoDetail = useCallback(async (id) => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(API.PHOTO_INFO(id));

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const photoData = await response.json();
      setPhoto(photoData);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching photo detail:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Retry function for error handling
  const retry = useCallback(() => {
    fetchPhotoDetail(photoId);
  }, [fetchPhotoDetail, photoId]);

  // Fetch photo detail when photoId changes
  useEffect(() => {
    fetchPhotoDetail(photoId);
  }, [fetchPhotoDetail, photoId]);

  // Memoized values for better performance
  const photoImageUrl = useMemo(() => {
    if (!photo) return null;
    return API.PHOTO_IMAGE(photo.id, 800, 600);
  }, [photo]);

  const photoInfo = useMemo(() => {
    if (!photo) return null;

    return {
      id: photo.id,
      author: photo.author,
      width: photo.width,
      height: photo.height,
      url: photo.url,
      downloadUrl: photo.download_url,
      // Generate placeholder content for title and description since API doesn't provide these
      title: `Photo by ${photo.author}`,
      description: `Beautiful photograph captured by ${photo.author}.`
    };
  }, [photo]);

  return {
    photo: photoInfo,
    photoImageUrl,
    loading,
    error,
    retry,
  };
};
