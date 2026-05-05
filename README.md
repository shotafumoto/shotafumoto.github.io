# Shota Fumoto — Photographer

シングルページの写真サイト。フルスクリーンスライダー方式。
旧サイトの思想を踏襲し、写真ファースト・分類なし・最大限大きく見せる構成。

---

## 構造

- `index.html` — トップページ(スライダー全20枚 + About + Contact)
- `style.css` — スタイル
- `script.js` — スライダー/モーダル動作
- `robots.txt` — AI学習bot除外
- `.nojekyll` — GitHub Pages設定(隠しファイル)
- `images/` — 写真フォルダ(ここに20枚 + α を入れる)

ナビは **About / Contact / Instagramアイコン** の3つのみ。

---

## 1. 必要画像 — 全20枚

`images/` フォルダに以下のファイル名で配置すること。

### 旧サイトから継承(15枚 — そのまま使える)
- shota_0001.jpg
- shota_0004.jpg
- shota_0008.jpg
- shota_0010.jpg
- shota_0014.jpg
- shota_0016.jpg
- shota_0017.jpg
- shota_0025.jpg
- shota_0026.jpg
- shota_0030.jpg
- shota_0033.jpg
- shota_0038.jpg
- shota_0039.jpg
- shota_0040.jpg
- shota_0041.jpg

### 新規追加(5枚 — 補強)
- doc_0008.jpg     — B&W馬の厩、スローシャッター系(shota_0008と並べて作家性強化)
- doc_0489.jpg     — B&W画家川辺、長期密着の代表
- doc_0769.jpg     — B&W煙草の男性、ストリート最強カット
- fash_0029.jpg    — DAMAGED Tokyo B&W白帽子、商業実績の象徴
- commerce_0011.jpg — Bunkyo校パンフ表紙級、青空生徒シルエット

---

## 2. 画像最適化(重要)

書き出し設定:
- **長辺 1800px**(高解像度ディスプレイ対応)
- **JPG 品質 80**
- **sRGBカラースペース**
- **メタデータ: GPS情報を必ず削除**(被写体プライバシー保護)

Lightroom: ファイル → 書き出し → メタデータ「著作権のみ」
Capture One: プロセスレシピ → メタデータ → Creator/Copyrightのみ

---

## 3. デプロイ手順(GitHub Pages)

ターミナル不要、ブラウザだけで完結する手順:

### A. 旧ファイルの整理
1. GitHubで `shotafumoto.github.io` リポジトリを開く
2. 古いHTML/CSS/JSファイル(旧サイト由来)を削除
   - 古い `index.html`、古い CSS、古い JS など
3. **写真ファイル `shota_0001.jpg` 〜 `shota_0041.jpg` は削除しない**(再利用するため)
4. 前回の試作で作った `work.html`, `project-*.html` 等の余計なファイルがあれば全部削除

### B. 新ファイルのアップロード
1. リポジトリトップで「Add file」→「Upload files」
2. このフォルダの中身をすべてドラッグ&ドロップ
   - HTML/CSS/JS/.nojekyll/robots.txt
   - `images/` フォルダ(中の新規5枚を含めて)
3. **既存の `shota_*.jpg` は触らない**(リポジトリのルートにあれば、それを画像参照する)

### C. 重要 — 写真の配置場所
旧サイトは `shota_0001.jpg` などを**リポジトリのルート直下**に置いていた。
今回の新サイトは **`images/` フォルダ内**を参照する設定。

選択肢A(推奨): `shota_*.jpg` 15枚を `images/` フォルダに移動 + 新規5枚も `images/` に
→ 旧画像をブラウザで「Edit (rename)」して `images/shota_XXXX.jpg` に変更すれば移動できる
→ または旧画像を一旦ダウンロード→ローカルで images/ にまとめて → 一括アップロード

選択肢B(楽): 旧画像はリポジトリルートに残したまま、新規5枚だけ `images/` に置く
→ HTMLの画像パスを修正する必要あり(下記参照)

### D. (選択肢Bの場合)パス修正
`index.html` を編集モードで開き、以下を全置換:
- `images/shota_` → `shota_` (合計15箇所)
- `images/doc_`、`images/fash_`、`images/commerce_` はそのまま

---

## 4. 動作確認

公開後 5〜10分待ってから `https://shotafumoto.github.io` を開く:

- [ ] スライダーが20枚循環する
- [ ] 写真クリック / 矢印キー / 左右ボタン / スワイプ で次へ進む
- [ ] About クリックでモーダルが開く / ESCで閉じる
- [ ] Contact クリックでモーダルが開く / ESCで閉じる
- [ ] 右上の Instagram アイコンをクリックで @shotafumoto が新タブで開く
- [ ] スマホでも縦表示・スワイプ操作で問題ない
- [ ] 全20枚が表示される(画像欠けなし)

---

## 5. 写真を後から差し替え/追加する

差し替え:
- `images/` の同名ファイルを上書きアップロードするだけ

追加:
1. 新しい画像を `images/` にアップロード
2. `index.html` を編集モードで開く
3. 任意の `<figure class="slide" data-index="..."` 行をコピペで追加
4. 末尾の counter 数字 (`<span class="total">20</span>`) を新しい総数に更新
5. Commit

順序変更:
- `<figure>` 行の順番を入れ替えるだけ。data-index属性は表示順序に影響しない(JSが再計算する)

---

## 6. プライバシー&セキュリティ

このサイトには以下の対策が組み込まれている:

- 第三者トラッキングなし(Google Analytics等を一切埋め込んでいない)
- Cookieなし
- 外部リクエストゼロ(フォント・スクリプト全てローカル)
- お問い合わせは mailto のみ(フォーム送信先サーバーを介さない)
- HTTPS は GitHub Pages で自動
- robots.txt で主要AI学習bot(GPTBot, ClaudeBot, Google-Extended等)を除外
- referrer policy = strict-origin-when-cross-origin
- 外部リンクは rel="noopener" 付き

※追加で推奨: 撮影地のGPS情報を含む写真をアップロードしない(EXIFを削除して書き出し)

---

## 7. トラブル

**Q: スライダーが動かない**
JavaScript無効になっていないか確認。F12でブラウザコンソールにエラーが出ていないか。

**Q: 写真が表示されない**
- ファイル名のスペル・大文字小文字を確認(GitHub Pagesは区別する)
- `images/` フォルダ内にあるか確認
- 数分待つ(GitHub Pagesは反映に時間がかかる)
- ブラウザキャッシュをクリア(Ctrl+Shift+R / Cmd+Shift+R)

**Q: モバイルで表示が崩れる**
ブラウザを最新に更新。Safari/Chrome/Firefoxの最新版で動作確認済み。
