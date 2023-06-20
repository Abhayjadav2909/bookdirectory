import { error } from "console"
import mongoose from "mongoose"


export class DButil{
    public static connectToDb(DbUrl : string , DbDataBase : string):Promise<string>{
        return new Promise((resolve,reject)=>{
            mongoose.connect(DbUrl,{
                dbName : DbDataBase
            },(error)=>{
                if(error){
                    reject("MongoDB Connnetion Failed")
                }
                else{
                    resolve("MongoDB Connection SuccessFully")
                }
            })
        })
    }
}