import React, { useState } from 'react'

import { useTodo } from '../context/todoContext'


const TodoForm = () => {

    const { addTodo } = useTodo();
    const [todoName, SetTodoName] = useState("");
    const [error, setError] = useState("");

    const add = (e) => {
        if (todoName.trim() === "") {
            setError("Field cannot be empty");

            setTimeout(() => {
                setError("");
            }, 2000);

            return;
        }
        addTodo({
            todo: todoName,
            status: false
        })
        SetTodoName("");

    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            add();
        }
    };

    return (
        <>
            <div className='flex p-4 m-2 gap-5 justify-between'>
                <input
                    onChange={(e) => { SetTodoName(e.target.value) }}
                    value={todoName}
                    onKeyDown={handleKeyDown}
                    type="text" placeholder="Enter Your Task" className="w-full border border-gray-400 sm:text-lg py-1 px:4 sm:px-5 rounded text-gray-600" />
                <button
                    onClick={add}
                    className="bg-blue-500 text-white rounded cursor-pointer py-2 px-5 hover:bg-blue-700">Add</button>
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}

        </>

    )
}

export default TodoForm




