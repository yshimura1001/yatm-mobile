export interface TimeTask {
  id: string;
  title: string;
  estimatedMinutes: number;
  actualMinutes: number;
  startTime?: Date;
  endTime?: Date;
  isCompleted: boolean;
  isRunning: boolean;
}
