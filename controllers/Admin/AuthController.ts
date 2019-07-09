import express from 'express'
import db from '../../models/index'
import jwt from 'jsonwebtoken'
import Joi from 'joi'
import bcrypt from 'bcrypt'
import response from '../../components/response'
const router = express.Router()

router.post('/login', async (req, res) => {
    try{
        const schema = Joi.object().keys({
            username: Joi.string().alphanum().label('نام کاربری').required(),
            password: Joi.string().required().label('رمز عبور')
        })
        
        const data = await Joi.validate(req.body, schema)
        
        const admin = await db.Admin.findOne({
            where: {
                username: data.username
            }
        })
        if(!admin) {
            return response.validation(res, 'نام کاربری یا رمز عبور اشتباه است')
        }
        // if(admin.disabled){
        //     return response.customError(res, 'حساب کاربری شما مسدود شده است با ادمین تمایس بگیرید',401)
        // }
       const isOk = await bcrypt.compare(data.password, admin.password)

        if (!isOk) {
            return response.validation(res, 'نام کاربری یا رمز عبور اشتباه است')
        }

        delete admin.password
        delete admin.reset_token

        
        const app_key = "Moz" + (process.env.APP_KEY || 'secret') + "Lorem Admin"
        const token = jwt.sign({data: admin}, app_key)

        return response.success(res, {
            user: admin,
            token
        })
    }catch(err) {
        console.log(err)
        return response.customError(res,'مشکلی در سمت سرور پیش آمده است',500, err)
    }
    
})

export default router