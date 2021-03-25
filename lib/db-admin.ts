import { db } from "./firebase-admin";

export async function getStudentShedule(groupName: string) {
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

export async function getDoctorRecords(doctor: string) {
  try {
    const snapshot = await db
      .collection("records")
      .where("doctorId", "==", doctor)
      .get();
    const records = [];
    snapshot.forEach((doc) => {
      records.push({ ...doc.data() });
    });
    return { records };
  } catch (error) {
    return { error };
  }
}

export async function getAllDoctorRecords(startTime: Date, endTime: Date) {
  try {
    const snapshot = await db
      .collection("records")
      .where("startDate", "!=", startTime.getTime())
      .get();
    const records = [];
    snapshot.forEach((doc) => {
      records.push({ ...doc.data() });
    });
    return { records };
  } catch (error) {
    return { error };
  }
}
