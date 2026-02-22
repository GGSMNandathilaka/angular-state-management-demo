export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

export type TaskFilter = 'all' | 'active' | 'completed';
