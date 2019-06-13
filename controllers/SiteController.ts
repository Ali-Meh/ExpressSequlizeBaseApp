import express from 'express'
import db from '../models/index'

const router = express.Router();

let routes=require('./Admin').default
Object.keys(routes).forEach((key)=> {

    router.use('/admin/'+key.slice(0,key.length-13).toLowerCase(),routes[key].default)
});


// router.get('/', async (req, res) => {
    
//     const admin = await db.Admin.findAll({
//     })
//     //@ts-ignore
//     return validation(res, admin)
// })

export default router