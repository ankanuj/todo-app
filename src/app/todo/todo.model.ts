import { TodoStatus } from "./todo.constants";
export interface Todo {
    id: number;
    title: string;
    status?: TodoStatus;
  }