import { useState, useCallback } from "react";

/**
 * React hook for handling direct file uploads.
 * Uploads files directly to /api/upload endpoint.
 */
export function useUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [progress, setProgress] = useState(0);

  /**
   * Get upload parameters for Uppy.
   * Returns a presigned-URL-like interface but uses direct upload.
   */
  const getUploadParameters = useCallback(
    async (
      file: any
    ): Promise<{
      method: "POST";
      url: string;
      headers?: Record<string, string>;
    }> => {
      // Return a direct upload configuration
      return {
        method: "POST",
        url: "/api/upload",
      };
    },
    []
  );

  /**
   * Upload a file directly.
   */
  const uploadFile = useCallback(
    async (file: File): Promise<{ url: string } | null> => {
      setIsUploading(true);
      setError(null);
      setProgress(0);

      try {
        setProgress(30);
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Upload failed");
        }

        setProgress(100);
        const data = await response.json();
        return { url: data.url };
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Upload failed");
        setError(error);
        return null;
      } finally {
        setIsUploading(false);
      }
    },
    []
  );

  return {
    uploadFile,
    getUploadParameters,
    isUploading,
    error,
    progress,
  };
}
