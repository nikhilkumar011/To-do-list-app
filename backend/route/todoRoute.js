const express = require('express');

const router = express.Router()

const {addTodo,updateStatusTodo,editTodoName,deleteTodo,getAllTodos} = require('../controller/todoController.js');

router.post('/',addTodo);

router.put('/:id',updateStatusTodo);

router.patch('/:id',editTodoName);

router.delete('/:id',deleteTodo);

router.get('/',getAllTodos);

module.exports = router;