export interface TaskList {
    id:number | undefined;
    title: string;
    description?: string;
    dueDate : Date;
    isCompleted:boolean;
  }

  