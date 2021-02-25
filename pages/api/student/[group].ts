import { getStudentShedule } from "@/lib/db-admin";

export default async (req, res) => {
  const {
    query: { group },
  } = req;
  const shedule = await getStudentShedule(group);
  res.status(200).json(shedule);
};
