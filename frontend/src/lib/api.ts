/**
 * 背景削除APIを呼び出す
 */
export async function removeBackground(file: File): Promise<Blob> {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch("/api/remove-bg", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    let message = "背景削除に失敗しました。";
    try {
      const data = await response.json();
      message = data.detail || message;
    } catch {
      // ignore parse error
    }
    throw new Error(message);
  }

  return response.blob();
}

/**
 * ヘルスチェックAPIを呼び出す
 */
export async function healthCheck(): Promise<{ status: string; service: string }> {
  const response = await fetch("/api/health");
  if (!response.ok) {
    throw new Error("API is not available");
  }
  return response.json();
}
