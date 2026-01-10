import React, { useState ,useRef, useEffect} from 'react'

import { useTodo } from '../context/todoContext'



const TodoList = ({ todo }) => {

  const { editTodoName, deleteTodo, updateStatusTodo } = useTodo();
  const [isTodoEditable, SetIsTodoEditable] = useState(false);
  const [todoMsg, SetTodoMsg] = useState(todo.todo)
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);


  const edit = () => {
    editTodoName({ todo: todoMsg }, todo._id);

    SetIsTodoEditable(false);
  }
  const toggle = () => {
    updateStatusTodo(todo._id)
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (

    <div
    ref={wrapperRef}
    className="relative flex justify-between w-full mb-2">
      <div className="left flex gap-3 mx-3 ">
        <input type="checkbox"
          checked={todo.status}
          onChange={() => toggle(todo._id)}
          
          name="" id="" className="border size-8"/>
          <input
            type="text"
            value={todoMsg}
            readOnly={!isTodoEditable}
            onClick={() => setOpen((o) => !o)}
            onChange={(e) =>
              SetTodoMsg(e.target.value)
            }

            className={`w-auto sm:w-60 md:w-70 lg:w-96 xl:w-150 ${todo.status ? "line-through text-green-600" : ""} ${isTodoEditable ? "bg-white " : ""}`}/>
          
          </div>
          <div className="right flex gap-3 mx-3 ">
            <button
              onClick={() => {
                if (todo.status) return;
                if (isTodoEditable) {
                  edit(todo._id);
                } else {
                  SetIsTodoEditable((prev) => !prev);
                }
              }}
              className="cursor-pointer">{isTodoEditable ?  "✉": "🖊"}</button>
            <button
              onClick={() => deleteTodo(todo._id)}
              className="cursor-pointer ">❌</button>
          </div>

           {open && (
        <div className="absolute left-11 top-full mt-1 max-w-xl bg-white border rounded shadow-lg p-2 z-20">
          {todoMsg}
        </div>
      )}
      </div>
    


  )
}

export default TodoList

