importScripts('https://www.gstatic.com/firebasejs/9.19.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.19.1/firebase-messaging-compat.js');


const firebaseConfig = {
    apiKey: "AIzaSyA5LGTVDTS-YlThPhlpN64Yg9mIseo2kj4",
    authDomain: "real-time-notification-91200.firebaseapp.com",
    projectId: "real-time-notification-91200",
    storageBucket: "real-time-notification-91200.firebasestorage.app",
    messagingSenderId: "613581524201",
    appId: "1:613581524201:web:e84236a4337ce63321b478",
    measurementId: "G-V7TQVNV1VQ"
  };


// Initialize Firebase app in the service worker
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('Received background message: ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});


