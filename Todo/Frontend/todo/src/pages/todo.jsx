import React, { useEffect, useState } from "react";
import api from "../components/axios";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import { setTodos, addTodo, deleteTodo } from "../store/todoSlice";
import { useNavigate } from "react-router-dom";

function Todo() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const todos = useSelector((state) => state.todos.todos);

  const [content, setContent] = useState("");
  const [response, setResponse] = useState("");

  const handleLogout = async () => {
    await api.get("/logout");
    dispatch(logout());
    navigate("/");
  };

  
  const fetchTodos = async () => {
    const res = await api.get("/todos");
    dispatch(setTodos(res.data)); //db say todo store mn save krwana, set kr k
  };

  useEffect(() => { //page k render hoty hi todos fetch kry jo bhi db mein hain
    fetchTodos();
  }, []);

  // ADD TODO
  const handleAdd = async () => {
    if (!content) return;

    const res = await api.post("/todos", { content });

    dispatch(addTodo(res.data));
    setContent(""); //user enter kr rha todo wo
  };

  // DELETE TODO
  const handleDelete = async (id) => {
  await api.delete(`/todos/${id}`);

    dispatch(deleteTodo(id));
  };

  return (
    <div className="min-h-screen text-white flex justify-center p-10">

      <div className="w-full max-w-xl">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Todo</h1>
          <button onClick={handleLogout} className="bg-red-600 px-4 py-2 rounded-md">
            Logout
          </button>
        </div>

        {/* Add Todo */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Enter your task..."
            className="flex-1 p-2 rounded-md "
          />
          <button
            onClick={handleAdd}
            className="bg-blue-600 px-4 py-2 rounded-md"
          >
            Add
          </button>
        </div>

        {/* Todo List */}
        <div className="space-y-3">

          {todos.map((todo) => (
            <div
              key={todo._id}
              className="flex justify-between items-center bg-gray-800 p-3 rounded-md"
            >
              <p>{todo.content}</p>

              <button
                onClick={() => handleDelete(todo._id)}
                className="bg-red-500 px-3 py-1 rounded-md"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}

export default Todo;