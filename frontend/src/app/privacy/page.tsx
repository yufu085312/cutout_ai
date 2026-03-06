import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "Cutout AIのプライバシーポリシー。画像の取り扱い、個人情報保護について。",
};

export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "48px 24px" }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 32 }}>
        プライバシーポリシー
      </h1>

      <div className="prose-dark">
        <p>
          Cutout AI（以下「本サービス」）は、ユーザーのプライバシーを尊重し、
          個人情報の保護に努めています。
        </p>

        <h2>1. 画像データの取り扱い</h2>
        <p>
          本サービスにアップロードされた画像は、背景削除処理のためにのみ使用されます。
          処理が完了した後、画像データはサーバーから即座に削除され、
          一切保存されません。
        </p>

        <h2>2. 収集する情報</h2>
        <p>本サービスでは、以下の情報を収集する場合があります：</p>
        <ul>
          <li>アクセスログ（IPアドレス、ブラウザ情報、アクセス日時）</li>
          <li>利用統計（ページビュー、利用回数）</li>
        </ul>
        <p>
          これらの情報は、サービスの改善およびセキュリティの維持のために使用されます。
        </p>

        <h2>3. Cookie</h2>
        <p>
          本サービスでは、Google AdSenseによる広告配信のためにCookieを使用する場合があります。
          ユーザーはブラウザの設定によりCookieの使用を拒否することができます。
        </p>

        <h2>4. 第三者への提供</h2>
        <p>
          法令に基づく場合を除き、ユーザーの個人情報を第三者に提供することはありません。
        </p>

        <h2>5. お問い合わせ</h2>
        <p>
          プライバシーに関するお問い合わせは、
          <a href="/contact">お問い合わせページ</a>よりご連絡ください。
        </p>

        <p style={{ marginTop: 48, fontSize: 13, color: "var(--text-muted)" }}>
          最終更新日: 2025年1月1日
        </p>
      </div>
    </div>
  );
}
