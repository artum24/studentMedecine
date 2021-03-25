import type { NextApiRequest, NextApiResponse } from "next";
import { getStudentShedule } from "@/lib/db-admin";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { group },
  } = req;
  const shedule = await getStudentShedule(group.toString());
  res.status(200).json(shedule);
};
