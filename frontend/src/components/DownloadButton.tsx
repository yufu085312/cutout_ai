"use client";

interface DownloadButtonProps {
  imageUrl: string;
  filename?: string;
}

export default function DownloadButton({ imageUrl, filename = "cutout.png" }: DownloadButtonProps) {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      className="btn-primary"
      onClick={handleDownload}
      style={{ fontSize: 16, padding: "14px 36px" }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      Download PNG
    </button>
  );
}
