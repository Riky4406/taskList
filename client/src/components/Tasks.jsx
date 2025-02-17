import React, { Component, useEffect, useState } from "react";
import service from "../service.js";
import { useNavigate } from "react-router-dom";


export const Tasks = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const navigateToTask = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigateToTask("/login"); // אם אין טוקן, נווט לדף התחברות
    } else {
      getTodos(); // אם יש טוקן, טען את המשימות
    }
  }, []);

  async function getTodos() {
    try {
      const todos = await service.getTasks();
      setTodos(todos);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  }

  async function createTodo(e) {
    e.preventDefault();
    await service.addTask(newTodo);
    setNewTodo(""); //clear input
    await getTodos(); //refresh tasks list (in order to see the new one)
  }

  async function updateCompleted(todo, isComplete) {
    await service.setCompleted(todo.id, isComplete);
    await getTodos(); //refresh tasks list (in order to see the updated one)
  }

  async function deleteTodo(id) {
    await service.deleteTask(id);
    await getTodos(); //refresh tasks list
  }

  const handleLogout = () => {
    localStorage.removeItem("token"); // מחיקת הטוקן
    navigateToTask("/login"); // ניווט לדף הלוגין
  };
  return (
    <>
      <header class="app-header1">
      <svg
          className="logo2"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* <!-- עיגול רקע --> */}
          <circle cx="50" cy="50" r="45" fill="url(#gradient)" />

          {/* <!-- סימן ה-V --> */}
          <path
            d="M30 50 L45 65 L70 35"
            stroke="white"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
          />

          {/* <!-- הגדרת גרדיאנט צבעים --> */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop
                offset="0%"
                style={{ stopColor: "#007BFF", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#00C853", stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>
        </svg>
      </header>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={createTodo}>
            <input
              className="new-todo"
              placeholder="Well, let's take on the day"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
          </form>
        </header>
        <section className="main" style={{ display: "block" }}>
          <ul className="todo-list">
            {todos.map((todo) => {
              return (
                <li
                  className={todo.isComplete ? "completed" : ""}
                  key={todo.id}
                >
                  <div className="view">
                    <input
                      className="toggle"
                      type="checkbox"
                      defaultChecked={todo.isComplete}
                      onChange={(e) => updateCompleted(todo, e.target.checked)}
                    />
                    <label>{todo.name}</label>
                    <button
                      className="destroy"
                      onClick={() => deleteTodo(todo.id)}
                    ></button>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </section>
       <button onClick={handleLogout}>Logout</button> 
    </>
  );
};
// return (
//   <>
//   <header className="app-header">
{
  /* logo */
}
{
  /* <svg
       className="logo2"
       viewBox="0 0 100 100"
       xmlns="http://www.w3.org/2000/svg" >
       <circle cx="50" cy="50" r="45" fill="url(#gradient)" />
       <path
         d="M30 50 L45 65 L70 35"
         stroke="white"
         strokeWidth="8"
         fill="none"
         strokeLinecap="round"
       />
       <defs>
         <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
           <stop
             offset="0%"
             style={{ stopColor: "#007BFF", stopOpacity: 1 }}
           />
           <stop
             offset="100%"
             style={{ stopColor: "#00C853", stopOpacity: 1 }}
           />
         </linearGradient>
       </defs>
     </svg> */
}
{
  /* <section className="todoapp">
      <header className="header">
        <h1 id="h1">todos</h1>
        
        <form onSubmit={createTodo}>
          <input
            className="new-todo"
            placeholder="Well, let's take on the day"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
        </form>
      </header>
      <section className="main" style={{ display: "block" }}>
        <ul className="todo-list">
          {todos.map((todo) => {
            return (
              <li className={todo.isComplete ? "completed" : ""} key={todo.id}>
                <div className="view">
                  <input
                    className="toggle"
                    type="checkbox"
                    defaultChecked={todo.isComplete}
                    onChange={(e) => updateCompleted(todo, e.target.checked)}
                  />
                  <label>{todo.name}</label>
                  <button
                    className="destroy"
                    onClick={() => deleteTodo(todo.id)}
                  ></button>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </section> */
}
{
  /* <button onClick={handleLogout}>Logout</button> */
}
{
  /* </> */
}
{
  /* ); */
}
{
  /* }; */
}

export default Tasks;
