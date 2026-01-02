export interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
  children: Task[];
  isExpanded: boolean;
  note?: string;
  perspectiveId?: string;
  // 将来のフィールドのプレースホルダー
  // dueDate?: Date;
  // projectId?: string;
}
