import { TableDataType } from "types/table";

export const data: TableDataType[] = [
  {
    title: "Перелом руки",
    startDate: new Date(2021, 2, 1, 9, 30),
    endDate: new Date(2021, 2, 1, 11, 30),
    id: 0,
    doctorId: 1,
  },
  {
    title: "Травма ноги",
    startDate: new Date(2021, 2, 2, 9, 35),
    endDate: new Date(2021, 2, 2, 11, 30),
    id: 1,
    doctorId: 1,
  },
  {
    title: "Біль очей",
    startDate: new Date(2021, 2, 3, 9, 35),
    endDate: new Date(2021, 2, 3, 11, 30),
    id: 2,
    doctorId: 2,
  },
  {
    title: "Заглушило вухо",
    startDate: new Date(2021, 2, 4, 9, 35),
    endDate: new Date(2021, 2, 4, 11, 30),
    id: 3,
    doctorId: 3,
  },
];
