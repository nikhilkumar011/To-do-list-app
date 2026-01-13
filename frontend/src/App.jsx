import { useState, useEffect } from 'react'
import { todoContext } from './context/todoContext'
import { Button } from "flowbite-react";
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import TodoSearch from './components/Todosearch'

function App() {

  const API_URL = import.meta.env.VITE_API_URL;

  const [todos, SetTodos] = useState([]);
  const [loading, SetLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadMsg, SetLoadMsg] = useState("");

  const addTodo = async (todo) => {
    try {
      SetLoading(true);
      SetLoadMsg("Adding Todo...")
      const response = await fetch(`${API_URL}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(todo)
        })
      const savedTodo = await response.json();
      SetTodos((prev) => [...prev, savedTodo]);
    } catch (error) {
      console.log(error)
    } finally {
      SetLoading(false);
      SetLoadMsg("");
    }



  }

  const updateStatusTodo = async (id) => {

    const response = await fetch(`${API_URL}/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      })

    SetTodos((prev) => prev.map(
      (each) => each._id === id ? { ...each, status: !each.status } : each
    )
    )
  }

  const editTodoName = async (todo, id) => {
    try {
      SetLoading(true);
      SetLoadMsg("Updating Todo...")
      const response = await fetch(`${API_URL}/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(todo)
        })

      const newtodo = await response.json()
      SetTodos((prev) => prev.map(
        (each) => each._id === id ? newtodo : each
      ))
    } catch (error) {
      console.log(error)
    } finally {
      SetLoading(false)
      SetLoadMsg("");
    }
  }

  const deleteTodo = async (id) => {
    try {
      SetLoading(true);
      SetLoadMsg("Deleting Todo...")
      const response = await fetch(`${API_URL}/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        })
      SetTodos((prev) => prev.filter(
        (each) => each._id !== id
      ))
    } catch (error) {
      console.log(error)
    } finally {
      SetLoading(false);
      SetLoadMsg("");
    }
  }

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        SetLoading(true);
        SetLoadMsg("Loading Todos...");

        const res = await fetch(`${API_URL}/`);
        const data = await res.json();
        SetTodos(data);
      } catch (error) {
        console.error(error);
      } finally {
        SetLoading(false);
        SetLoadMsg("");
      }
    };

    fetchTodos();
  }, []);

  return (
    <todoContext.Provider value={{ todos, addTodo, updateStatusTodo, editTodoName, deleteTodo, setSearchTerm }}>
      <div className="flex flex-col justify-center items-center container mx-auto bg-gray-50 w-full md:max-w-1/2 mt-50 p-5
    shadow rounded-2xl">
        <h1 className="text-2xl font-mono font-bold text-gray-500">To-do List 📃</h1>


        <TodoForm />
        <TodoSearch/>
        {loading && <p style={{ color: "blue" }}>{loadMsg}</p>}
        {
          todos
            .filter((todo) =>
              todo.todo.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((each) => (
              <TodoList key={each._id} todo={each} />
            ))
        }

      </div>

    </todoContext.Provider>
  )
}

export default App
