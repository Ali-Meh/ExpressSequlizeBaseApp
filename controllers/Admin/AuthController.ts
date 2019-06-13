import express from 'express'
import db from '../../models/index'
import jwt from 'jsonwebtoken'
import Joi from 'joi'
import bcrypt from 'bcrypt'
import { ValidationError } from 'sequelize/types';

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
            //@ts-ignore
            return validation(res, null, 'نام کاربری یا رمز عبور اشتباه است')
        }

       const isOk = await bcrypt.compare(data.password, admin.password)

        if (!isOk) {
            //@ts-ignore
            return validation(res, null, 'نام کاربری یا رمز عبور اشتباه است')
        }

        delete admin.password
        delete admin.reset_token

        
        const app_key = "Moz" + (process.env.APP_KEY || 'secret') + "Lorem Admin"
        const token = jwt.sign({data: admin}, app_key)

        //@ts-ignore
        return success(res, {
            user: admin,
            token
        })
    }catch(err) {
        console.log(err)
        //@ts-ignore
        return customError(res, 500, 'مشکلی در سمت سرور پیش آمده است', err)
    }
    
})

export default router