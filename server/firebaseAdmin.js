const admin = require("firebase-admin");
const serviceAccount = require("./real-time-notification-91200-firebase-adminsdk-88ixi-be3132e96d.json");
//JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// const sendNotification = async (fcmToken, notification) => {
//   try {
//     await admin.messaging().send({
//       token: fcmToken,
//       notification,
//     });
//     console.log("Notification sent successfully");
//   } catch (error) {
//     console.error("Error sending notification:", error);
//   }
// };

// module.exports = { sendNotification };
module.exports = admin;