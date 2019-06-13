import {Request, Response} from 'express'
import jwt from 'jsonwebtoken'
import db from '../models'
import {ErrorHandler} from '../components/response'

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
                return admin;
            }
            let err=new ErrorHandler("Unauthorized user!",401,"UnAUTH");
            throw err;
        } catch (error) {
            let err=new ErrorHandler("Unauthorized user!",401,"UnAUTH");
            throw err;
        }
    }
}