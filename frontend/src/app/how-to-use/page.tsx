import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "使い方",
  description: "Cutout AIの使い方を3ステップで解説。画像アップロードからダウンロードまで。",
};

export default function HowToUsePage() {
  const steps = [
    {
      number: "01",
      title: "画像をアップロード",
      description:
        "エディターページで画像をドラッグ＆ドロップするか、「画像を選択」ボタンをクリックしてファイルを選択します。",
      details: [
        "対応形式: PNG, JPG, JPEG, WEBP",
        "最大ファイルサイズ: 10MB",
        "最大解像度: 4096px",
      ],
    },
    {
      number: "02",
      title: "AIが背景を削除",
      description:
        "アップロードが完了すると、AIが自動的に画像の背景を検出・削除します。処理は通常数秒で完了します。",
      details: [
        "U²-Netモデルによる高精度な背景検出",
        "人物・商品・動物・車などに対応",
        "画像はサーバーに保存されません",
      ],
    },
    {
      number: "03",
      title: "結果をダウンロード",
      description:
        "処理が完了すると、元画像と背景削除後の画像が並んで表示されます。「Download PNG」ボタンで透過PNGをダウンロードできます。",
      details: [
        "透過PNGとして出力",
        "市松模様で透過部分を確認可能",
        "何度でも繰り返し利用可能",
      ],
    },
  ];

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "48px 24px" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>使い方</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 16 }}>
          3ステップで簡単に背景を削除できます
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        {steps.map((step) => (
          <div
            key={step.number}
            className="glass-card"
            style={{ padding: 32 }}
          >
            <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 800,
                  background: "var(--gradient-primary)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  lineHeight: 1,
                  flexShrink: 0,
                }}
              >
                {step.number}
              </div>
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>
                  {step.title}
                </h2>
                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: 15,
                    lineHeight: 1.7,
                    marginBottom: 16,
                  }}
                >
                  {step.description}
                </p>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                  }}
                >
                  {step.details.map((detail) => (
                    <li
                      key={detail}
                      style={{
                        fontSize: 13,
                        color: "var(--text-muted)",
                        paddingLeft: 16,
                        position: "relative",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          left: 0,
                          color: "var(--accent-primary)",
                        }}
                      >
                        •
                      </span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
