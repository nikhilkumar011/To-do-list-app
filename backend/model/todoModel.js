const mongoose = require('mongoose');

const schema = mongoose.Schema;

const todoSchema = new schema(
    {
        todo:{
            type:String,
            required:true
        },
        status:{
            type:Boolean,
            required:false
        }
    },{timestams:true}
)

module.exports = mongoose.model("todo",todoSchema)
