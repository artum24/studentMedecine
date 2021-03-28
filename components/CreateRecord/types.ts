export type RecordsType = {
  startDate: Date;
  endDate: Date;
  title: string;
  doctorId: string;
};

export type SearchType = {
  description: string;
  doctor: { value: string; label: string };
};
