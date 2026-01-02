export type Frequency = 'Daily' | 'Weekly' | 'Monthly' | 'Custom';

export interface Routine {
  id: string;
  title: string;
  frequency: Frequency;
  completedToday: boolean;
  streak: number;
  lastCompleted?: Date;
  perspectiveId?: string;
}
