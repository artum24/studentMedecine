import { getAllDoctorRecords } from "@/lib/db-admin";

export default async (req, res) => {
  const time = req.query;
  const records = await getAllDoctorRecords(
    new Date(time[0]),
    new Date(time[1])
  );
  res.status(200).json(records);
};
