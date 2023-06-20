import mongoose from "mongoose";
import { IBook } from "../models/Ibook";


const BookScema = new mongoose.Schema({
    id : {type : String , require : true},
    Bookname : {type : String , require : true},
    AutherName : {type : String , require : true},
    Bookversion : {type :String , require :true},
    price : {type : Number , require : true},
    pages : {type : Number , require : true},
    password : {type : String , require : true},
    email: {type : String , require : true},
},{timestamps : true})

const Booktable = mongoose.model<IBook>("Books",BookScema)


export default Booktable