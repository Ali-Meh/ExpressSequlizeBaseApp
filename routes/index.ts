import express from 'express'

const router = express.Router()

import v1 from './v1'

router.use('/api/v1', v1)

export default router