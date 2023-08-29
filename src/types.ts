export interface TodoList {
  todos: Todo[];
}

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
