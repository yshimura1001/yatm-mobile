export interface Project {
  id: string;
  name: string;
  color: string; // 16進数コードまたはIonicのカラー名
  taskCount?: number;
  perspectiveId?: string;
}
