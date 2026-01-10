import { useState ,useEffect} from 'react'
import {todoContext} from './context/todoContext'
import { Button } from "flowbite-react";
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'

function App() {

  const API_URL = import.meta.env.VITE_API_URL;

  const [todos,SetTodos] = useState([]);

  const addTodo =async (todo)=>{
      
       const response = await fetch(`${API_URL}`,
        {
          method:"POST",
         headers:{"Content-Type":"application/json"},
         body:JSON.stringify(todo)
        }) 
      
        const savedTodo = await response.json();
       SetTodos((prev)=>[...prev,savedTodo]);
  }

  const updateStatusTodo =async (id)=>{
       const response = await fetch(`${API_URL}/${id}`,
        {
          method:"PUT",
         headers:{"Content-Type":"application/json"},
        })

      SetTodos((prev)=>prev.map(
        (each)=> each._id === id? {...each, status : !each.status} : each
      )
      )
  }

  const editTodoName = async(todo,id)=>{
       const response = await fetch(`${API_URL}/${id}`,
        {
          method:"PATCH",
         headers:{"Content-Type":"application/json"},
         body:JSON.stringify(todo)
        })

        const newtodo = await response.json()
       SetTodos((prev)=> prev.map(
        (each)=> each._id === id? newtodo : each
       ))
  }

  const deleteTodo =async (id)=>{
    const response = await fetch(`${API_URL}/${id}`,
        {
          method:"DELETE",
         headers:{"Content-Type":"application/json"},
        })
    SetTodos((prev)=>prev.filter(
      (each)=> each._id !== id
    ))
  }

  useEffect(()=>{
    const fetchTodos = async ()=>{
      const res = await fetch(`${API_URL}/`);
      const data = await res.json();
      SetTodos(data);
    }

    fetchTodos();
  },[])
  return (
   <todoContext.Provider value={{todos,addTodo,updateStatusTodo,editTodoName,deleteTodo}}>
    <div className="flex flex-col justify-center items-center container mx-auto bg-gray-50 w-full md:max-w-1/2 mt-50 p-5
    shadow rounded-2xl">
    <h1 className="text-2xl font-mono font-bold text-gray-500">To-do List 📃</h1>

     <TodoForm/>
    {
      todos.map((each)=>(
        <div>
          <TodoList key={each._id} todo={each}/>
        </div>
      ))
    } 
    </div>
   </todoContext.Provider>
  )
}

export default App
