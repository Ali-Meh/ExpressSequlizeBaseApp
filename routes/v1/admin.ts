import express from 'express'

const router = express.Router()

import authAdmin from '../../middleware/adminAuth'
router.use(authAdmin)



router.use('*',(req,res,next)=>{
    res.status(404).json({
        message:"the page looking for not found",
        code:"NOT_FOUND"
    })
})


export default router