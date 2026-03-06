import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ - よくある質問",
  description: "Cutout AIのよくある質問と回答。対応画像形式、料金、プライバシーなど。",
};

export default function FAQPage() {
  const faqs = [
    {
      q: "どんな画像に対応していますか？",
      a: "PNG, JPG, JPEG, WEBP形式の画像に対応しています。ファイルサイズは最大10MB、解像度は最大4096pxまでです。",
    },
    {
      q: "料金はかかりますか？",
      a: "完全無料でご利用いただけます。アカウント登録も不要です。",
    },
    {
      q: "アップロードした画像は保存されますか？",
      a: "いいえ。アップロードされた画像はサーバーに保存されません。処理後すぐにメモリから削除されます。",
    },
    {
      q: "どのような背景が削除できますか？",
      a: "人物、商品、動物、車など、様々な被写体の背景を削除できます。U²-Netモデルにより高精度な切り抜きを実現しています。",
    },
    {
      q: "処理にどのくらい時間がかかりますか？",
      a: "通常、数秒で処理が完了します。画像のサイズや複雑さによって多少変動する場合があります。",
    },
    {
      q: "出力形式は何ですか？",
      a: "背景が透過されたPNG画像として出力されます。",
    },
    {
      q: "一度に複数の画像を処理できますか？",
      a: "現在は1枚ずつの処理のみ対応しています。一括処理機能は将来的に追加予定です。",
    },
    {
      q: "スマートフォンからも利用できますか？",
      a: "はい。ブラウザで動作するため、スマートフォンやタブレットからもご利用いただけます。",
    },
  ];

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "48px 24px" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>
          よくある質問
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 16 }}>
          Cutout AIに関するよくある質問と回答
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="glass-card"
            style={{ padding: "24px 28px" }}
          >
            <h2
              style={{
                fontSize: 16,
                fontWeight: 600,
                marginBottom: 10,
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
              }}
            >
              <span style={{ color: "var(--accent-primary)", flexShrink: 0 }}>Q.</span>
              {faq.q}
            </h2>
            <p
              style={{
                fontSize: 15,
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                paddingLeft: 28,
              }}
            >
              {faq.a}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
