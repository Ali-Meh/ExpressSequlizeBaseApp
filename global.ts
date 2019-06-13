import {Response} from 'express'

//@ts-ignore
global.success = (res:Response, data?: object, message?:string) => {
    res.status(200).json({
        data,
        message
    })
}

//@ts-ignore
global.validation = (res:Response, data: object, message:string|null) => {
    res.status(400).json({
        data,
        message
    })
}

//@ts-ignore
global.customError = (res:Response, code:number, message:string, fileds?: object) => {
    console.log(fileds);
    
    res.status(code).json({
        message,
        fileds
    })
}