import { Request , Response } from "express";
import { IBook } from "../models/Ibook";
import Booktable from "../database/Bookschema";
import mongoose from "mongoose";
import {validationResult} from 'express-validator'
import { APP_STATUS } from "../constants/constants";

export const Addbook=async(request : Request , response : Response)=>{
    const error = validationResult(request)
    if(!error.isEmpty()){
        return response.status(200).json({
            status : APP_STATUS.FAILED,
            data : null,
            error : error.array()
        })
    }
    try{
        let {id,Bookname,AutherName,Bookversion,price,pages} = request.body

        let chekbookname = await Booktable.findOne({Bookname:Bookname})
        if(chekbookname){
            return response.status(200).json({
                status : APP_STATUS.FAILED,
                data : null,
                msg : "Bookname is Already exits"
            })
        }
        let thebookobj : IBook ={
            id :id,
            Bookname:Bookname,
            AutherName:AutherName,
            Bookversion:Bookversion,
            price:price,
            pages:pages
        }
        thebookobj = await new  Booktable(thebookobj).save()
        if(thebookobj){
            return response.status(200).json({
                msg : "Book Updated",
                data : thebookobj
            })
        }
        response.send("Book Uploaded")
    }
    catch(error : any){
        return response.status(400).json({
            status : APP_STATUS.FAILED,
            data : null,
            error:error.message
        })
    }
}


export const getbook=async(request : Request , response :Response)=>{
    try{
        let Book : IBook [] = await Booktable.find()
        if(Book){
            return response.status(200).json(Book)
        }
    }
    catch(error : any){
        return response.status(400).json({
            status : APP_STATUS.FAILED,
            data : null,
            error:error.message
        })
    }
}

export const singlebook = async(request : Request , response : Response)=>{
    try{
        let {bookid} = request.params
        if(bookid){
            const mongobookid = new mongoose.Types.ObjectId(bookid)
            const book = await Booktable.findById(mongobookid)

            if(!book){
                return response.status(400).json({
                    status : APP_STATUS.FAILED,
                    data : null,
                    msg : "Book Not Found"
                })
            }
            return response.status(200).json(book)
        }
    }
    catch(error : any){
        return response.status(400).json({
            status : APP_STATUS.FAILED,
            data : null,
            error:error.message
        })
    }
}

export const updatebook=async(request : Request , response : Response)=>{
    let {bookid} = request.params
    try{
        let {id,Bookname,AutherName,Bookversion,price,pages} = request.body

        const mongobookid= new mongoose.Types.ObjectId(bookid)
        const book = await Booktable.findById(mongobookid)

        // let chekbookname = await Booktable.findOne({Bookname:Bookname})
        if(!book){
            return response.status(400).json({
                status : APP_STATUS.FAILED,
                data : null,
                msg : "Book Not Found"
            })
        }
        let thebookobj : IBook | null  ={
            id :id,
            Bookname:Bookname,
            AutherName:AutherName,
            Bookversion:Bookversion,
            price:price,
            pages:pages
        }
        thebookobj = await  Booktable.findByIdAndUpdate(mongobookid,{$set : thebookobj},{new : true})
        if(thebookobj){
            return response.status(200).json({
                msg : "Book Updated",
                data : thebookobj   
            })
            
        }        
    }
    catch(error : any){
        return response.status(400).json({
            status : APP_STATUS.FAILED,
            data : null,
            error:error.message
        })
    }
}

export const deletebook = async(request : Request , response : Response)=>{
    try{
        let {bookid} = request.params
        if(bookid){
            const mongobookid = new mongoose.Types.ObjectId(bookid)
            const book = await Booktable.findById(mongobookid)

            if(!book){
                return response.status(400).json({
                    status : APP_STATUS.FAILED,
                    data : null,
                    msg : "Book not Found"
                })
            }
            let thebookobj = await Booktable.findByIdAndDelete(mongobookid)
            if(thebookobj){
                return response.status(200).json({
                    status : APP_STATUS.SUCCESS,
                    data: null,
                    msg : "Book SuccessFully deleted...!"
                })
            }
        }
    }
    catch(error : any){
        return response.status(400).json({
            status : APP_STATUS.FAILED,
            data : null,
            error:error.message
        })
    }
}