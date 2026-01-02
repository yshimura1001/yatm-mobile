export interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
  children: Task[];
  isExpanded: boolean;
  note?: string;
  // Future fields placeholders
  // dueDate?: Date;
  // projectId?: string;
}
