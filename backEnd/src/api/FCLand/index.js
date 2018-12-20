import {Router} from 'express'
import {schema} from './model'
import {middleware as body} from "bodymen";
import {findPid, showfeatures} from './controller'

export FCLand, {schema} from './model'

const router = new Router()
const {email, password, userName, personId} = schema.tree
const {mun, tract, block, lot, pid} = ''

router.post('/',
    body({mun, tract, block, lot}),
    findPid)

router.post('/features',
    body({pid}),
    showfeatures)

export default router