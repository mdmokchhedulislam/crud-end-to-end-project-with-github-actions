import mongoose from "mongoose";

const contacSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    gmail:{
        type:String,
        require:true,
    },
    phone:{
        type:String,
        require:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

export const contacts = mongoose.model("contacts",contacSchema)