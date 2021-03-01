export type TableDataType = {
  title: string;
  startDate: Date;
  endDate: Date;
  id: number;
  doctorId: string;
}


export type GroupSheduleType = {
  group: String;
  "Понеділок": boolean[],
  "Вівторок": boolean[],
  "Середа": boolean[],
  "Четвер":boolean[],
  "П'ятниця": boolean[]
}