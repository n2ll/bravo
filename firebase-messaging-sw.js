importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSy8nVWvhYv9xSpuTsFwCT191HB31Tu1Ko_",
  authDomain: "bravo-2954e.firebaseapp.com",
  projectId: "bravo-2954e",
  storageBucket: "bravo-2954e.appspot.com",
  messagingSenderId: "527906393561",
  appId: "1:527906393561:web:60206163b82b7898cb13a0"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  console.log('📬 백그라운드 메시지:', payload);
  const title = payload.notification?.title || 'BravoMate';
  const options = {
    body: payload.notification?.body || '새 메시지가 있습니다!',
    icon: '/icon.png'
  };
  self.registration.showNotification(title, options);
});
