import { Router } from 'express'
import FCLand from './FCLand'

const router = new Router()

router.use('/FCLand', FCLand)

export default router
