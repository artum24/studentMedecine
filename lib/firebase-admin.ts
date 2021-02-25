import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIEN_EMAIL,
      privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY.replace(
        /\\n/g,
        "\n"
      ),
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    }),
  });
}

const db = admin.firestore();
const auth = admin.auth();

export { db, auth };
