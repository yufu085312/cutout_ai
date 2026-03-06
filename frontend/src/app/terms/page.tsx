import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "利用規約",
  description: "Cutout AIの利用規約。サービスの利用条件について。",
};

export default function TermsPage() {
  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "48px 24px" }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 32 }}>
        利用規約
      </h1>

      <div className="prose-dark">
        <p>
          この利用規約（以下「本規約」）は、Cutout AI（以下「本サービス」）の利用条件を定めるものです。
          本サービスをご利用いただく場合、本規約に同意したものとみなします。
        </p>

        <h2>1. サービス内容</h2>
        <p>
          本サービスは、画像の背景をAIで自動的に削除するWebツールです。
          無料でご利用いただけます。
        </p>

        <h2>2. 利用条件</h2>
        <ul>
          <li>本サービスは個人・商用問わずご利用いただけます</li>
          <li>違法な画像の処理には使用しないでください</li>
          <li>他者の著作権を侵害する目的での使用は禁止します</li>
          <li>サービスへの過度な負荷をかける行為は禁止します</li>
        </ul>

        <h2>3. 免責事項</h2>
        <p>
          本サービスは「現状のまま」で提供されます。
          処理結果の品質や精度について保証するものではありません。
          本サービスの利用により生じた損害について、一切の責任を負いません。
        </p>

        <h2>4. 利用制限</h2>
        <ul>
          <li>ファイルサイズ：最大10MB</li>
          <li>解像度：最大4096px</li>
          <li>リクエスト数：1分あたり5回</li>
        </ul>

        <h2>5. 規約の変更</h2>
        <p>
          本規約は予告なく変更される場合があります。
          変更後のサービス利用をもって、変更後の規約に同意したものとみなします。
        </p>

        <p style={{ marginTop: 48, fontSize: 13, color: "var(--text-muted)" }}>
          最終更新日: 2025年1月1日
        </p>
      </div>
    </div>
  );
}
