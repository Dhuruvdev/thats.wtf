import { useState, useCallback, useRef } from "react";
import { Upload, X, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface UploaderProps {
  onComplete?: (url: string) => void;
  onError?: (error: string) => void;
  maxSize?: number; // in bytes
  accept?: string;
}

export function AdvancedUploader({
  onComplete,
  onError,
  maxSize = 500 * 1024 * 1024, // 500MB
  accept = "video/*,image/*",
}: UploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [fileName, setFileName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFile = useCallback(
    async (file: File) => {
      // Validate file
      if (file.size > maxSize) {
        const sizeInMB = (maxSize / 1024 / 1024).toFixed(0);
        const error = `File too large. Max ${sizeInMB}MB allowed.`;
        setError(error);
        setStatus("error");
        onError?.(error);
        return;
      }

      setIsUploading(true);
      setStatus("uploading");
      setFileName(file.name);
      setError("");
      setProgress(0);

      try {
        const formData = new FormData();
        formData.append("file", file);

        // Use XMLHttpRequest for better progress tracking
        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener("progress", (e) => {
          if (e.lengthComputable) {
            const percentComplete = Math.round((e.loaded / e.total) * 100);
            setProgress(percentComplete);
          }
        });

        xhr.addEventListener("load", () => {
          if (xhr.status === 200) {
            try {
              const response = JSON.parse(xhr.responseText);
              if (response.success && response.url) {
                setProgress(100);
                setStatus("success");
                onComplete?.(response.url);
                
                // Reset after 2 seconds
                setTimeout(() => {
                  setStatus("idle");
                  setProgress(0);
                  setFileName("");
                }, 2000);
              } else {
                throw new Error(response.error || "Upload failed");
              }
            } catch (err) {
              const errorMsg = err instanceof Error ? err.message : "Invalid response";
              setError(errorMsg);
              setStatus("error");
              onError?.(errorMsg);
            }
          } else {
            const errorMsg = `Upload failed with status ${xhr.status}`;
            setError(errorMsg);
            setStatus("error");
            onError?.(errorMsg);
          }
        });

        xhr.addEventListener("error", () => {
          const errorMsg = "Network error during upload";
          setError(errorMsg);
          setStatus("error");
          onError?.(errorMsg);
        });

        xhr.open("POST", "/api/upload", true);
        xhr.send(formData);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "Upload failed";
        setError(errorMsg);
        setStatus("error");
        onError?.(errorMsg);
      } finally {
        setIsUploading(false);
      }
    },
    [maxSize, onComplete, onError]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      uploadFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      uploadFile(files[0]);
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    if (fileInputRef.current && !isUploading) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`relative group rounded-[32px] border-2 border-dashed transition-all duration-300 cursor-pointer ${
          isDragging
            ? "border-purple-500 bg-purple-500/10"
            : "border-white/10 bg-black/60 hover:border-purple-500/30"
        } ${isUploading || status === "uploading" ? "cursor-not-allowed opacity-60" : ""}`}
      >
        {/* Background Video/Image Preview */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-transparent to-black/20" />

        {/* Upload Content */}
        <div className="flex flex-col items-center justify-center p-8 sm:p-12 min-h-56">
          {status === "idle" && (
            <>
              <div className="w-16 h-16 rounded-[24px] bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Upload className="w-8 h-8 text-zinc-500" />
              </div>
              <p className="text-[15px] font-bold text-zinc-500 text-center">Drop media here</p>
              <p className="text-[11px] font-black text-zinc-700 uppercase tracking-widest mt-1">
                or click to upload
              </p>
              <p className="text-[10px] text-zinc-600 mt-3">MP4, WebM, JPEG, PNG • Up to 500MB</p>
            </>
          )}

          {status === "uploading" && (
            <>
              <div className="w-full max-w-xs space-y-4">
                <p className="text-sm font-semibold text-white text-center truncate">{fileName}</p>
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-zinc-400 text-center">{progress}% uploaded</p>
              </div>
            </>
          )}

          {status === "success" && (
            <>
              <CheckCircle2 className="w-12 h-12 text-green-500 mb-3 animate-bounce" />
              <p className="text-sm font-bold text-green-400">Upload complete!</p>
              <p className="text-xs text-zinc-500 mt-1">{fileName}</p>
            </>
          )}

          {status === "error" && (
            <>
              <AlertCircle className="w-12 h-12 text-red-500 mb-3" />
              <p className="text-sm font-bold text-red-400 text-center">Upload failed</p>
              <p className="text-xs text-zinc-500 mt-2 text-center max-w-xs">{error}</p>
              <Button
                size="sm"
                variant="outline"
                className="mt-4 text-xs"
                onClick={() => setStatus("idle")}
              >
                Try Again
              </Button>
            </>
          )}

          {/* Hidden File Input - always available for clicking */}
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileSelect}
            disabled={isUploading}
            data-testid="input-file-upload"
            className="hidden"
          />
        </div>

        {/* Close Button (for selected file) */}
        {(status === "uploading" || status === "success") && (
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 z-10"
            onClick={(e) => {
              e.stopPropagation();
              setStatus("idle");
              setProgress(0);
              setFileName("");
            }}
          >
            <X className="w-5 h-5" />
          </Button>
        )}
      </div>
    </div>
  );
}
