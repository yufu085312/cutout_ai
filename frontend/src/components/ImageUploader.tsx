"use client";

import { useCallback, useRef, useState } from "react";

interface ImageUploaderProps {
  onImageSelected: (file: File) => void;
  isProcessing: boolean;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp"];

export default function ImageUploader({ onImageSelected, isProcessing }: ImageUploaderProps) {
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return "対応していないファイル形式です。PNG, JPG, WEBPのみ対応しています。";
    }
    if (file.size > MAX_FILE_SIZE) {
      return "ファイルサイズが10MBを超えています。";
    }
    return null;
  };

  const handleFile = useCallback(
    (file: File) => {
      const err = validateFile(file);
      if (err) {
        setError(err);
        return;
      }
      setError(null);
      onImageSelected(file);
    },
    [onImageSelected]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOver(false);
  }, []);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div>
      <div
        className={`upload-zone ${dragOver ? "drag-over" : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
        style={{
          opacity: isProcessing ? 0.5 : 1,
          pointerEvents: isProcessing ? "none" : "auto",
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".png,.jpg,.jpeg,.webp"
          onChange={handleInputChange}
          style={{ display: "none" }}
        />

        {/* Upload Icon */}
        <div
          style={{
            width: 72,
            height: 72,
            margin: "0 auto 20px",
            borderRadius: "50%",
            background: "rgba(108, 92, 231, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 32,
          }}
        >
          📤
        </div>

        <p style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
          画像をドラッグ＆ドロップ
        </p>
        <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 20 }}>
          または
        </p>
        <span className="btn-primary" style={{ fontSize: 14 }}>
          画像を選択
        </span>
        <p
          style={{
            fontSize: 12,
            color: "var(--text-muted)",
            marginTop: 20,
          }}
        >
          PNG, JPG, WEBP | 最大10MB
        </p>
      </div>

      {error && (
        <div
          style={{
            marginTop: 12,
            padding: "12px 16px",
            borderRadius: "var(--radius-sm)",
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            color: "#ef4444",
            fontSize: 14,
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
}
