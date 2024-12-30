interface ProjectData {
  code: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReturnedProject {
  status: number;
  message: string;
  data: ProjectData;
}
