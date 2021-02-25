import { db } from "./firebase-admin";

export async function getStudentShedule(groupName) {
  try {
    const snapshot = await db
      .collection("group")
      .where("group", "==", groupName)
      .get();
    const group = [];
    snapshot.forEach((doc) => {
      group.push({ ...doc.data() });
    });
    return { group };
  } catch (error) {
    return { error };
  }
}
