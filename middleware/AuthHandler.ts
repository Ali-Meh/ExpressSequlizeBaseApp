import {Request, Response} from 'express'
import jwt from 'jsonwebtoken'
import db from '../models'
import {ErrorHandler} from '../components/response'
import _ from 'lodash'
export default class AuthHandler{
    private static adminKey:string="Moz" + (process.env.APP_KEY || 'secret') + "Lorem Admin";
    public static async AdminVerify(token:string){
        try {
            let decode=await jwt.verify(
                token,
                this.adminKey,
            );
            //@ts-ignore
            let admin = await db.Admin.findOne({where: {id: decode.data.id}, raw: true});
            if (admin) {
                //@ts-ignore
                return decode.data;
            }
            let err=new ErrorHandler("Unauthorized user!",401,"UnAUTH");
            throw err;
        } catch (error) {
            let err=new ErrorHandler("Unauthorized user!",401,"UnAUTH");
            throw err;
        }
    }
    public static async AdminGen(admin:any){
        if(admin&&_.isObject(admin)){
            //@ts-ignore
            if(admin.password){
                //@ts-ignore
                delete admin.password
            }
            //@ts-ignore
            if(admin.reset_token){
                //@ts-ignore
                delete admin.reset_token
            }
        }
        console.log(admin);
        
        return await jwt.sign({data: admin.dataValues}, this.adminKey)
    }
}