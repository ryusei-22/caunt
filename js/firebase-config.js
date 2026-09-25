// Firebase 設定
// この値は Firebase Console のプロジェクト設定から取得し、ここに貼り付けてください。
// 公開リポジトリの場合、Firestore Security Rules で書き込み制限をかけているため
// API キーを公開しても安全です（Firebase Web API Key は公開前提の設計です）。

export const FIREBASE_CONFIG = {
  apiKey:            "AIzaSyAj9YdjbZ6VkaE98cDAws9mKLvi5GX-po0",
  authDomain:        "caunt-event-counter.firebaseapp.com",
  projectId:         "caunt-event-counter",
  storageBucket:     "caunt-event-counter.firebasestorage.app",
  messagingSenderId: "640642698171",
  appId:             "1:640642698171:web:76031d698bb2b08550d29e",
};

// イベントID（複数イベントを管理する場合に変更）
export const EVENT_ID = "event-2026";

// 管理者パスワード（リセット時に使用）
export const ADMIN_PASSWORD = "change-me-before-use";
