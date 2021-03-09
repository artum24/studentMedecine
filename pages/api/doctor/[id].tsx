import { getDoctorRecords } from "@/lib/db-admin";

export default async (req, res) => {
  const {
    query: { id },
  } = req;
  const records = await getDoctorRecords(id);
  res.status(200).json(records);
};
