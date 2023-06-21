import express,{ Request , Response, Application } from "express";
import dotenv from "dotenv"
import { DButil } from "./Util/DButil";
import BookRouter from "./router/BookRouter";


const app : Application = express()

dotenv.config({
    path:"./.env"
})
const port : string | number = process.env.PORT || 7654
const hostname : string | undefined = process.env.HOSTNAME
const DbUrl : string | undefined = process.env.DB_URL_NAME
const DbDataBase : string | undefined = process.env.DB_DATABASE


app.get("/",(request : Request , response : Response)=>{
    return response.status(200).json({
        msg : "Server Has Been Started...!"
    })
})

app.use(express.json()) 
app.use("/book",BookRouter)

if(port && hostname){
    app.listen(Number(port),()=>{
        if(DbUrl && DbDataBase){
            DButil.connectToDb(DbUrl,DbDataBase).then((dbResponse)=>{
                console.log(dbResponse);
            })
        }
        console.log(`Server Has Been Started At http://${hostname}:${port}`);
    })
}
