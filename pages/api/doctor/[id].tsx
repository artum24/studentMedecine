import type { NextApiRequest, NextApiResponse } from "next";
import { getDoctorRecords } from "@/lib/db-admin";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
  } = req;
  const records = await getDoctorRecords(id.toString());
  res.status(200).json(records);
};
