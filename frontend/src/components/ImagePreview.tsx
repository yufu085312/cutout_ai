"use client";

interface ImagePreviewProps {
  originalUrl: string;
  resultUrl: string;
}

export default function ImagePreview({ originalUrl, resultUrl }: ImagePreviewProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 24,
      }}
      className="image-preview-grid"
    >
      {/* Original */}
      <div>
        <p
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "var(--text-secondary)",
            marginBottom: 12,
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          元画像
        </p>
        <div
          className="glass-card"
          style={{
            padding: 8,
            overflow: "hidden",
          }}
        >
          <img
            src={originalUrl}
            alt="Original"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              borderRadius: "var(--radius-sm)",
            }}
          />
        </div>
      </div>

      {/* Result */}
      <div>
        <p
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "var(--text-secondary)",
            marginBottom: 12,
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          背景削除後
        </p>
        <div
          className="glass-card checkerboard"
          style={{
            padding: 8,
            overflow: "hidden",
          }}
        >
          <img
            src={resultUrl}
            alt="Background Removed"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              borderRadius: "var(--radius-sm)",
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          .image-preview-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
