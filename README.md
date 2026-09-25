# caunt — イベント来場者数カウンター

複数のスタッフがスマホでカウントし、代表者がリアルタイムで合計来場者数を確認できるWebアプリです。

## 機能

| 画面 | 対象 | 機能 |
|------|------|------|
| `/counter.html` | スタッフ | ボタン1つで来場者を+1カウント |
| `/admin.html` | 代表者 | 合計人数のリアルタイム表示・QRコード生成・リセット |

## 技術スタック

- **フロントエンド**: Vanilla HTML / CSS / JavaScript（ビルド不要）
- **データベース**: Firebase Firestore（アトミックインクリメントで同時押しでもズレなし）
- **ホスティング**: Netlify
- **バージョン管理**: GitHub

## セットアップ手順

### 1. Firebase プロジェクト設定

1. [Firebase Console](https://console.firebase.google.com/) でプロジェクトを作成
2. Firestore Database を有効化（本番モードで作成）
3. Web アプリを登録し、設定情報を取得

### 2. 設定ファイルの編集

`js/firebase-config.js` を開き、Firebase Console から取得した値を入力：

```js
export const FIREBASE_CONFIG = {
  apiKey:            "実際のAPIキー",
  authDomain:        "your-project.firebaseapp.com",
  projectId:         "your-project-id",
  // ...
};

export const EVENT_ID = "event-2026"; // イベント名に変更
export const ADMIN_PASSWORD = "安全なパスワードに変更"; // 管理者リセット用
```

### 3. Firestore セキュリティルール デプロイ

```bash
npx -y firebase-tools@latest login
npx -y firebase-tools@latest use your-project-id
npx -y firebase-tools@latest deploy --only firestore:rules
```

### 4. Netlify デプロイ

1. このリポジトリを GitHub に push
2. [Netlify](https://app.netlify.com/) でサイトを新規作成
3. GitHub リポジトリと連携
4. 自動デプロイが走り、公開URLが発行される

### 5. QRコード配布

管理画面（`/admin.html`）にアクセスすると、カウンターページへのQRコードが自動生成されます。スクリーンショットを印刷またはスタッフに共有してください。

## ファイル構成

```
caunt/
├── index.html           # トップ（カウンター/管理画面の選択）
├── counter.html         # スタッフ用カウンターページ
├── admin.html           # 代表者用管理画面
├── css/
│   └── style.css        # 共通スタイル
├── js/
│   └── firebase-config.js  # Firebase 設定（要編集）
├── firestore.rules      # Firestore セキュリティルール
├── firebase.json        # Firebase プロジェクト設定
├── netlify.toml         # Netlify 設定
└── README.md
```

## セキュリティについて

- Firebase Web API Key は公開前提の設計のため、GitHub に含めても問題ありません
- Firestore Security Rules でカウントの**加算のみ**を許可し、任意の書き換えを防止しています
- 管理者パスワードはソースコードに含まれるため、本番運用では環境変数化を推奨します

## 無料枠の範囲

| サービス | 無料枠 | 想定使用量 |
|----------|--------|-----------|
| Firebase Firestore | 読み取り50,000回/日・書き込み20,000回/日 | ✅ 十分 |
| Netlify | 帯域100GB/月 | ✅ 十分 |
