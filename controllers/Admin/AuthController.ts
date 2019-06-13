import express from 'express'
import db from '../../models/index'
import Joi from 'joi'
import bcrypt from 'bcrypt'
import response from '../../components/response'
import AuthHandler from '../../middleware/AuthHandler'
const router = express.Router()

router.post('/login', async (req, res) => {
    try{
        const schema = Joi.object().keys({
            username: Joi.string().alphanum().required().label("نام کاربری"),
            password: Joi.string().required().label('رمز عبور')
        })
        
        const {error, value} = Joi.validate(req.body, schema,{ abortEarly: false })
        if(error) {
            return response.validation(res, error)
        }
        const admin = await db.Admin.findOne({
            where: {
                username: value.username
            }
        })
        if(!admin) {
            return response.validation(res, 'نام کاربری یا رمز عبور اشتباه است')
        }

       const isOk = await bcrypt.compare(value.password, admin.password)

        if (!isOk) {
            return response.validation(res, 'نام کاربری یا رمز عبور اشتباه است')
        }
        const token =await AuthHandler.AdminGen(admin);

        return response.success(res, {
            user: admin,
            token
        })
    }catch(err) {
        return response.customError(res,'مشکلی در سمت سرور پیش آمده است',500, err)
    }
    
})

export default router