import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from "./api/apiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Todo } from "../types";
import "./TodoList.css";
const TodoList = () => {
  const [newTodo, setNewTodo] = useState("");

  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTodosQuery({});
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    addTodo({ userId: 1, title: newTodo, completed: false });
    setNewTodo("");
  };

  const newItemSection = (
    <form onSubmit={handleSubmit}>
      <div className="new-todo">
        <input
          type="text"
          id="new-todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter new todo"
        />
        <button className="submit">
          <FontAwesomeIcon icon={faUpload} />
        </button>
      </div>
    </form>
  );

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = todos.map((todo: Todo) => {
      return (
        <article key={todo.id} className="todo-article-container">
          <div className="todo">
            <input
              type="checkbox"
              checked={todo.completed}
              id={todo.id.toString()}
              onChange={() =>
                updateTodo({ ...todo, completed: !todo.completed })
              }
            />
            <label htmlFor={todo.id.toString()}>{todo.title}</label>
          </div>
          <button className="trash" onClick={() => deleteTodo({ id: todo.id })}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </article>
      );
    });
  } else if (isError) {
    content = <p>{"Error"}</p>;
  }

  return (
    <main className="todo-list-container">
      <h1 className="header">Todo List</h1>
      {newItemSection}
      <section className="todos">{content}</section>
    </main>
  );
};
export default TodoList;
