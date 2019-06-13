import express from 'express'

const router = express.Router()

import auth from './v1/auth'
import admin from './v1/admin'

router.use("/auth", auth)
router.use("/admin", admin)

export default router