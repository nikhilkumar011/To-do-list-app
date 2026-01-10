const todoModel = require('../model/todoModel.js');

exports.addTodo = async (req,res)=>{
    const data = req.body;
    if(!data){
        return res.status(400).send({
            "message":"Invalid data"
        })
    }
    
    const newData=await todoModel.create(data);

    res.status(200).json(newData);
}

exports.updateStatusTodo = async (req,res)=>{
    const id = req.params;

    const data = await todoModel.findById(id.id);

    if(!data){
        return res.status(404).send({
            "message":"Data Not found"
        })
    }
    
    data.status = !data.status;
   const newData= await data.save();

    res.status(200).json(newData);

}

exports.editTodoName = async (req,res)=>{
    const id = req.params;

    const newData = req.body;
    const data = await todoModel.findById(id.id);

    if(!data){
        return res.status(404).send({
            "message":"Data Not found"
        })
    }

   const updatedData= await todoModel.findByIdAndUpdate(id.id,newData);

    res.status(200).json(updatedData);

}

exports.deleteTodo = async (req,res)=>{
    const id = req.params;

    const data = await todoModel.findById(id.id);

    if(!data){
        return res.status(404).send({
            "message":"Data not found"
        })
    }

    const deletedData = await todoModel.findByIdAndDelete(id.id);

    res.status(200).json(deletedData);
}

exports.getAllTodos = async (req,res)=>{
    const todos = await todoModel.find();

    res.status(200).json(todos);
}