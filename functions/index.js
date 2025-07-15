const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const logger = require("firebase-functions/logger");
const fetch = require("node-fetch");

exports.notifyUserOnTripInvite = onDocumentCreated(
    "users/{userId}/trips/{tripId}",
    async (event) => {
      const userId = event.params.userId;
      const db = event.data && event.data.ref && event.data.ref.firestore;

      if (!db) return;

      try {
        // Get user's push token
        const userDoc = await db.doc(`users/${userId}`).get();
        const pushToken = userDoc.get("pushToken");

        if (!pushToken) {
          logger.warn(`No push token for user ${userId}`);
          return;
        }

        const message = {
          to: pushToken,
          sound: "default",
          title: "Trip Invitation",
          body: "You've been invited to a new trip!",
          data: {tripId: event.params.tripId},
        };

        // Send push notification via Expo
        await fetch("https://exp.host/--/api/v2/push/send", {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Accept-Encoding": "gzip, deflate",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(message),
        });

        logger.info(`Sent push notification to ${userId}`);
      } catch (error) {
        logger.error("Error sending notification:", error);
      }
    },
);
