import React, { useState, useEffect } from "react";
import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";
import './Todo.scss';

interface ToDo {
  id: number;
  description: string;
  completed: boolean;
}
const Todo: React.FC = () => {
  const [todos, setTodos] = useState<ToDo[]>(JSON.parse(localStorage.getItem('todos') || '[]'));
  const [desc, setDesc] = useState("");

  const handleAddTodo = () => {
    if (desc.trim() !== "") {
      const newTodo: ToDo = {
        id: Date.now(),
        description: desc,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setDesc("");
    }
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleCompleted = (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        } else {
          return todo;
        }
      })
    );
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h1>ToDo</h1>
        <div className="todo-input">
          <input
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <button onClick={handleAddTodo}>
            <AiOutlinePlus />
          </button>
        </div>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleCompleted(todo.id)}
              style={{ color: 'red' }} // exemplo de como alterar a cor do checkbox
            />
            <span>
              {todo.description}
            </span>
            <button onClick={() => handleDelete(todo.id)}>
              <AiOutlineDelete />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default Todo;
