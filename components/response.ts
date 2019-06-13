import { Response } from 'express';
import logger from './logger'
import _ from 'lodash'

export class ErrorHandler extends Error{
    message:string
    status:number
    code:string
    /**
     *
     */
    constructor(msg:string,status?:number,code?:string) {
        super(msg);
        this.message=msg
        this.status=status||500
        if(code){
            this.code=code||"Crash"
        }
    }

    
}

export default class ResponseHandler {


    static customError(res:Response, message:string,code:number, data?:any){
        return res.status(code).json({
            message,
            data
        })
    }

    static success(res:Response, data:any, message?:string) {
        return res.status(200).json({
            data,
            message
        })
    }

    static validation(res:Response, errors:any) {
        if(_.isString(errors)) {
            return res.status(400).json([errors])
        }
        let data = errors.details || errors
        return res.status(400).json(_.map(data, 'message'))
    }

    static catchError(res:Response, err:any) {
        console.log("********************************")
        console.log(err)
        console.log("********************************")

        logger.error(err)
        return ResponseHandler.customError(res, err, 500)
    }
}