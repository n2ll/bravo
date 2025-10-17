// ✅ Firebase compat 버전 import
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

// ✅ Firebase 설정 (index.html과 동일해야 함)
firebase.initializeApp({
  apiKey: "AIzaSy8nVWvhYv9xSpuTsFwCT191HB31Tu1Ko_",
  authDomain: "bravo-2954e.firebaseapp.com",
  projectId: "bravo-2954e",
  storageBucket: "bravo-2954e.appspot.com",
  messagingSenderId: "527906393561",
  appId: "1:527906393561:web:60206163b82b7898cb13a0"
});

// ✅ 메시징 객체 생성
const messaging = firebase.messaging();

// ✅ 백그라운드 메시지 수신
messaging.onBackgroundMessage((payload) => {
  console.log('📬 [ServiceWorker] 백그라운드 메시지 수신:', payload);
  const title = payload.notification?.title || 'BravoMate 알림';
  const options = {
    body: payload.notification?.body || '새 메시지가 도착했습니다.',
    icon: '/bravo/icon.png'
  };
  self.registration.showNotification(title, options);
});
