import express from 'express'

const router = express.Router()

import adminAuth from '../../controllers/Admin/AuthController'

router.use("/admin/", adminAuth)

export default router