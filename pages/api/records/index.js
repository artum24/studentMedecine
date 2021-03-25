import { getAllDoctorRecords } from "@/lib/db-admin";

export default async (req, res) => {
  const records = await getAllDoctorRecords(
    new Date(req.query['startDate']).getTime()/1000
  );
  res.status(200).json(records);
};
