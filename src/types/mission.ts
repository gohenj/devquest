export type MissionStatus = "planned" | "studying" | "completed";

export type Mission = {
  id: number;
  title: string;
  technology: string;
  status: MissionStatus;
};