console.log("🧩 [SW] 서비스워커 스크립트 로드 시작");

// ⚙️ Firebase compat 버전 import
try {
  console.log("🧩 [SW] Firebase SDK import 시작");
  importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
  importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');
  console.log("✅ [SW] Firebase SDK import 완료");
} catch (e) {
  console.error("❌ [SW] importScripts 오류:", e);
}

// ⚙️ Firebase 초기화
try {
  console.log("🧩 [SW] Firebase 초기화 시작");
  firebase.initializeApp({
    apiKey: "AIzaSy8nVWvhYv9xSpuTsFwCT191HB31Tu1Ko_",
    authDomain: "bravo-2954e.firebaseapp.com",
    projectId: "bravo-2954e",
    storageBucket: "bravo-2954e.appspot.com",
    messagingSenderId: "527906393561",
    appId: "1:527906393561:web:60206163b82b7898cb13a0"
  });
  console.log("✅ [SW] Firebase 초기화 완료");
} catch (e) {
  console.error("❌ [SW] Firebase 초기화 중 오류:", e);
}

// ⚙️ 메시징 객체 생성
let messaging;
try {
  console.log("🧩 [SW] Firebase Messaging 객체 생성 시도");
  messaging = firebase.messaging();
  console.log("✅ [SW] Messaging 객체 생성 완료");
} catch (e) {
  console.error("❌ [SW] Messaging 객체 생성 실패:", e);
}

// ⚙️ 백그라운드 푸시 수신 이벤트 등록
try {
  console.log("🧩 [SW] onBackgroundMessage 등록 시도");
  messaging.onBackgroundMessage((payload) => {
    console.log('📬 [SW] 백그라운드 메시지 수신:', payload);
    const title = payload.notification?.title || 'BravoMate 알림';
    const options = {
      body: payload.notification?.body || '새 메시지가 도착했습니다.',
      icon: '/bravo/icon.png'
    };
    self.registration.showNotification(title, options);
  });
  console.log("✅ [SW] onBackgroundMessage 등록 완료");
} catch (e) {
  console.error("❌ [SW] onBackgroundMessage 등록 오류:", e);
}

console.log("🏁 [SW] firebase-messaging-sw.js 로드 완료");
