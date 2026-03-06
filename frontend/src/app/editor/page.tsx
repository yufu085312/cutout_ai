"use client";

import { useState, useCallback } from "react";
import ImageUploader from "@/components/ImageUploader";
import ImagePreview from "@/components/ImagePreview";
import DownloadButton from "@/components/DownloadButton";
import { removeBackground } from "@/lib/api";
import type { Metadata } from "next";

export default function EditorPage() {
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelected = useCallback(async (file: File) => {
    // Cleanup previous URLs
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    if (resultUrl) URL.revokeObjectURL(resultUrl);

    setOriginalUrl(URL.createObjectURL(file));
    setResultUrl(null);
    setError(null);
    setIsProcessing(true);

    try {
      const blob = await removeBackground(file);
      setResultUrl(URL.createObjectURL(blob));
    } catch (e) {
      setError(e instanceof Error ? e.message : "処理に失敗しました。");
    } finally {
      setIsProcessing(false);
    }
  }, [originalUrl, resultUrl]);

  const handleReset = () => {
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setOriginalUrl(null);
    setResultUrl(null);
    setError(null);
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px" }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>
          背景を
          <span
            style={{
              background: "var(--gradient-primary)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            削除
          </span>
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 16 }}>
          画像をアップロードすると、AIが自動で背景を削除します
        </p>
      </div>

      {/* Upload or Result */}
      {!originalUrl && !isProcessing && (
        <div className="animate-fade-in-up">
          <ImageUploader onImageSelected={handleImageSelected} isProcessing={false} />
        </div>
      )}

      {/* Processing */}
      {isProcessing && (
        <div
          className="glass-card animate-fade-in-up"
          style={{
            padding: 60,
            textAlign: "center",
          }}
        >
          <div className="spinner" style={{ margin: "0 auto 24px" }} />
          <p style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
            処理中...
          </p>
          <p style={{ fontSize: 14, color: "var(--text-muted)" }}>
            AIが背景を削除しています。しばらくお待ちください。
          </p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div
          className="animate-fade-in-up"
          style={{
            padding: "16px 20px",
            borderRadius: "var(--radius-md)",
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            color: "#ef4444",
            fontSize: 15,
            marginBottom: 24,
            textAlign: "center",
          }}
        >
          {error}
        </div>
      )}

      {/* Result */}
      {originalUrl && resultUrl && !isProcessing && (
        <div className="animate-fade-in-up">
          <ImagePreview originalUrl={originalUrl} resultUrl={resultUrl} />

          <div
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              marginTop: 32,
              flexWrap: "wrap",
            }}
          >
            <DownloadButton imageUrl={resultUrl} />
            <button className="btn-secondary" onClick={handleReset} style={{ fontSize: 16, padding: "14px 36px" }}>
              別の画像を処理
            </button>
          </div>
        </div>
      )}

      {/* Re-upload after error */}
      {originalUrl && error && !isProcessing && (
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <button className="btn-secondary" onClick={handleReset} style={{ fontSize: 14 }}>
            やり直す
          </button>
        </div>
      )}
    </div>
  );
}
