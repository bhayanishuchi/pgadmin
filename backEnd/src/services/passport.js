import passport from 'passport'
import {Schema} from 'bodymen'
import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt'
import {jwtSecret, masterKey} from '../config'
import User, {schema} from '../api/FCLand/model'

export const token = ({required} = {}) => (req, res, next) =>
    passport.authenticate('token', {session: false}, (err, user, info) => {
        if (err || (required && !user) || (!required)) {
            return res.status(401).end()
        }
        req.logIn(user, {session: false}, (err) => {
            if (err) return res.status(401).end()
            next()
        })
    })(req, res, next)


passport.use('token', new JwtStrategy({
    secretOrKey: jwtSecret,
    jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromUrlQueryParameter('access_token'),
        ExtractJwt.fromBodyField('access_token'),
        ExtractJwt.fromAuthHeaderWithScheme('Bearer')
    ])
}, ({id}, done) => {
    User.findById(id).then((user) => {
        done(null, user)
        return null
    }).catch(done)
}))
