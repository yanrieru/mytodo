export interface Task {
  id: string;       // gunakan string supaya mudah untuk uuid
  title: string;
  time: string;
  date?: string;    // contoh: "2025-02-01"
  completed?: boolean;
}
