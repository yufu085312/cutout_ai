import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "100px 24px 80px",
          textAlign: "center",
          background: "var(--gradient-hero)",
        }}
      >
        {/* Decorative Orbs */}
        <div
          className="glow-orb"
          style={{
            width: 400,
            height: 400,
            background: "var(--accent-primary)",
            top: -100,
            left: "15%",
          }}
        />
        <div
          className="glow-orb"
          style={{
            width: 300,
            height: 300,
            background: "var(--accent-secondary)",
            bottom: -50,
            right: "10%",
          }}
        />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 720, margin: "0 auto" }}>
          {/* Badge */}
          <div
            className="animate-fade-in-up"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 16px",
              borderRadius: 100,
              background: "rgba(108, 92, 231, 0.15)",
              border: "1px solid rgba(108, 92, 231, 0.3)",
              fontSize: 13,
              color: "var(--accent-secondary)",
              marginBottom: 24,
            }}
          >
            ✨ 登録不要・完全無料
          </div>

          <h1
            className="animate-fade-in-up animate-delay-1"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: 20,
              letterSpacing: "-0.02em",
            }}
          >
            AIで背景を
            <br />
            <span
              style={{
                background: "var(--gradient-primary)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              自動削除
            </span>
          </h1>

          <p
            className="animate-fade-in-up animate-delay-2"
            style={{
              fontSize: 18,
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              marginBottom: 40,
              maxWidth: 500,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            画像をアップロードするだけで、高精度なAIが
            <br className="hidden sm:block" />
            自動で背景を削除。透過PNGを即生成します。
          </p>

          <div
            className="animate-fade-in-up animate-delay-3"
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/editor"
              className="btn-primary"
              style={{
                fontSize: 16,
                padding: "16px 36px",
                textDecoration: "none",
              }}
            >
              🚀 今すぐ試す
            </Link>
            <Link
              href="/how-to-use"
              className="btn-secondary"
              style={{
                fontSize: 16,
                padding: "16px 36px",
                textDecoration: "none",
              }}
            >
              使い方を見る
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        style={{
          padding: "80px 24px",
          maxWidth: 1000,
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: 28,
            fontWeight: 700,
            marginBottom: 12,
          }}
        >
          シンプルで
          <span style={{ color: "var(--accent-primary)" }}>パワフル</span>
        </h2>
        <p
          style={{
            textAlign: "center",
            color: "var(--text-secondary)",
            fontSize: 16,
            marginBottom: 48,
          }}
        >
          数秒で高品質な背景透過画像を作成
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 20,
          }}
        >
          {[
            {
              icon: "⚡",
              title: "高速処理",
              desc: "最先端のAIモデルが数秒で背景を正確に削除します。",
            },
            {
              icon: "🎯",
              title: "高精度",
              desc: "人物・商品・動物など様々な画像に対して高精度な切り抜きを実現。",
            },
            {
              icon: "🔒",
              title: "安全・プライバシー",
              desc: "画像はサーバーに保存されません。処理後すぐに削除されます。",
            },
            {
              icon: "💰",
              title: "完全無料",
              desc: "登録不要で何度でも利用可能。クレジットカードも不要です。",
            },
          ].map((feature) => (
            <div key={feature.title} className="feature-card">
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: "rgba(108, 92, 231, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  marginBottom: 16,
                }}
              >
                {feature.icon}
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>
                {feature.title}
              </h3>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section
        style={{
          padding: "80px 24px",
          background: "var(--bg-secondary)",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2
            style={{
              textAlign: "center",
              fontSize: 28,
              fontWeight: 700,
              marginBottom: 48,
            }}
          >
            3ステップで
            <span style={{ color: "var(--accent-primary)" }}>完了</span>
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 32,
              textAlign: "center",
            }}
          >
            {[
              { step: "01", title: "アップロード", desc: "画像をドラッグ＆ドロップ" },
              { step: "02", title: "AI処理", desc: "AIが自動で背景を削除" },
              { step: "03", title: "ダウンロード", desc: "透過PNGをダウンロード" },
            ].map((item) => (
              <div key={item.step}>
                <div
                  style={{
                    fontSize: 40,
                    fontWeight: 800,
                    background: "var(--gradient-primary)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    marginBottom: 12,
                  }}
                >
                  {item.step}
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: "80px 24px",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>
          さっそく始めてみましょう
        </h2>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: 16,
            marginBottom: 32,
          }}
        >
          登録不要・完全無料で今すぐ使えます
        </p>
        <Link
          href="/editor"
          className="btn-primary"
          style={{
            fontSize: 16,
            padding: "16px 40px",
            textDecoration: "none",
          }}
        >
          🚀 背景を削除する
        </Link>
      </section>
    </>
  );
}
