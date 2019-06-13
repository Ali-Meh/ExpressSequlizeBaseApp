import {Request, Response} from 'express'
import AuthHandler from './AuthHandler'

export default async (req:Request, res:Response, next:Function) => {
    if (
		req.headers &&
		req.headers.authorization &&
		req.headers.authorization.split(" ")[0] === "Bearer"
	) {
		try {
			const admin=await AuthHandler.AdminVerify(req.headers.authorization.split(" ")[1])
			console.log(admin);
			
			// if(admin){
				//@ts-ignore
				req.user=admin;
				next()
			// }
		} catch (error) {
			//@ts-ignore
			req.user = undefined;
			return res.status(401).json({message: "Unauthorized user!"});
		}
	} else {
		//@ts-ignore
		req.user = undefined;
		return res.status(401).json({message: "Unauthorized user!"});
	}
}