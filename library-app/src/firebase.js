// src/firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { getToken } from "firebase/messaging";
import { onMessage } from "firebase/messaging";
//import {onBackgroundMessage} from "firebase/messaging";
 const firebaseConfig = {
    apiKey: "AIzaSyA5LGTVDTS-YlThPhlpN64Yg9mIseo2kj4",
    authDomain: "real-time-notification-91200.firebaseapp.com",
    projectId: "real-time-notification-91200",
    storageBucket: "real-time-notification-91200.firebasestorage.app",
    messagingSenderId: "613581524201",
    appId: "1:613581524201:web:e84236a4337ce63321b478",
    measurementId: "G-V7TQVNV1VQ"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Messaging
const messaging = getMessaging(app);

// Function to get FCM token
export const requestForToken = async () => {
  try {
    const currentToken = await getToken(messaging, {
      vapidKey: "BCVw57ScywTygqKjA1lg1MO6RW1IHccrjPINJCBdNExolDtNXdQNqDSdeoozF2rrDdOuxy0k9ny9aCMChqnCLQE",
    });
    if (currentToken) {
      console.log("FCM Token:", currentToken);
      return currentToken; // Return the token to save in the database
    } else {
      console.warn("No registration token available.");
    }
  } catch (error) {
    console.error("Error retrieving FCM token:", error);
  }
};

// Listen for foreground messages
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

  onMessage(messaging, (payload) => {
    console.log("Notification received:", payload);
    alert(payload.notification.body); // Trigger an alert for the notification
  });
  
// // Handle background messages
// messaging.onBackgroundMessage((payload) => {
//   console.log('Received background message:', payload);

//   // Customize notification
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: payload.notification.icon,
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });// Handle background messages

export {firebaseConfig};