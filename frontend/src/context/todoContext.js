import React, {createContext,useContext} from 'react';

export const todoContext = createContext({
    todos : [
        {
            todo:"",
            status:false
        },
    ],
    addTodo: ()=>{},
    updateStatusTodo:()=>{},
    editTodoName:()=>{},
    deleteTodo:()=>{}
    
}

)



export const  useTodo=() =>{
    return useContext(todoContext);
}