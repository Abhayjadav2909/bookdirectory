import express,{ Router , Request , Response } from "express";
import { body } from "express-validator";
import * as BookController from "../controller/Bookcontroller"
import * as tokenVerifier from "../middleware/tokenverify"
const BookRouter : Router = Router()


const multer = require("multer")


const storage = multer.diskStorage({
        destination : function(request : Request,file: any,cb :any)
        {

            cb(null,'public/profile')
        },
        filename:function(request : Request,file : any,cb : any)
        {
            cb(null,file.fieldname+"-"+Date.now()+".jpg")
        }
    })
    const upload=multer({storage:storage})
    //module.exports=upload;

BookRouter.post("/single",upload.single("image"),(request , response)=>{
    console.log(request);
    
    response.send("file upload ")
});
BookRouter.post("/register",[
            body("id").not().isEmpty().withMessage("id is Required"),
            body("Bookname").not().isEmpty().withMessage("Bookname is Required"),
            body("AutherName").not().isEmpty().withMessage("AutherName is Required"),
            body("Bookversion").not().isEmpty().withMessage("Bookversion is Required"),
            body("price").not().isEmpty().withMessage("price is Required"),
            body("pages").not().isEmpty().withMessage("pages is Required"),
            body("password").not().isEmpty().withMessage("password is Required"),
            body("email").not().isEmpty().withMessage("email is Required"),
            body("image").not().isEmpty().withMessage("image is Required"),
],async(request : Request , response : Response)=>{
    await BookController.Addbook(request,response)
})


BookRouter.post("/login",[
    body("password").not().isEmpty().withMessage("password is Required"),
    body("email").not().isEmpty().withMessage("email is Required"),
],async(request : Request , response : Response)=>{
    await BookController.loginbook(request,response)
})


BookRouter.get("/",async(request : Request , response : Response)=>{
    await BookController.getbook(request,response) 
})


BookRouter.get("/:bookid",async(request : Request , response : Response)=>{
    await BookController.singlebook(request,response) 
})

BookRouter.put("/:bookid",async(request : Request , response : Response)=>{
    await BookController.updatebook(request,response) 
})

BookRouter.delete("/:bookid",async(request : Request , response : Response)=>{
    await BookController.deletebook(request,response) 
})



export default BookRouter
