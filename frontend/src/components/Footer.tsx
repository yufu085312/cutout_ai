import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border-subtle)",
        background: "var(--bg-secondary)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "48px 24px 24px",
        }}
      >
        {/* Links Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 32,
            marginBottom: 40,
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  background: "var(--gradient-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                }}
              >
                ✂️
              </div>
              <span style={{ fontWeight: 700, fontSize: 16 }}>Cutout AI</span>
            </div>
            <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6 }}>
              AIで画像の背景を<br />自動削除するWebツール
            </p>
          </div>

          {/* Service */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 12, textTransform: "uppercase", letterSpacing: 1 }}>
              サービス
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              <li><Link href="/editor" style={{ fontSize: 14, color: "var(--text-muted)", textDecoration: "none" }}>背景削除</Link></li>
              <li><Link href="/how-to-use" style={{ fontSize: 14, color: "var(--text-muted)", textDecoration: "none" }}>使い方</Link></li>
              <li><Link href="/faq" style={{ fontSize: 14, color: "var(--text-muted)", textDecoration: "none" }}>FAQ</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 12, textTransform: "uppercase", letterSpacing: 1 }}>
              法的情報
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              <li><Link href="/privacy" style={{ fontSize: 14, color: "var(--text-muted)", textDecoration: "none" }}>プライバシーポリシー</Link></li>
              <li><Link href="/terms" style={{ fontSize: 14, color: "var(--text-muted)", textDecoration: "none" }}>利用規約</Link></li>
              <li><Link href="/contact" style={{ fontSize: 14, color: "var(--text-muted)", textDecoration: "none" }}>お問い合わせ</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div
          style={{
            borderTop: "1px solid var(--border-subtle)",
            paddingTop: 20,
            textAlign: "center",
            fontSize: 13,
            color: "var(--text-muted)",
          }}
        >
          © {new Date().getFullYear()} Cutout AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
