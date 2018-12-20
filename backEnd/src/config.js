import path from 'path'
import merge from 'lodash/merge'

var connectionString = "postgres://postgres:pooja@localhost:5432/postgres";

const config = {
    all: {
        env: process.env.NODE_ENV || 'development',
        root: path.join(__dirname, '..'),
        port: process.env.PORT || 9000,
        ip: process.env.IP || '0.0.0.0',
        jwtSecret: "5syk8UVAFInGrOZozqg08GiWBDuTSJAH",
        mongo: {
            options: {
                db: {
                    safe: true
                }
            }
        }
    },
    test: { },
    development: {
        mongo: {
            uri: 'postgres://postgres:pooja@localhost:5432/postgres',
            options: {
                debug: true
            }
        }
    },
    production: {
        ip: process.env.IP || undefined,
        port: process.env.PORT || 9000,
        mongo: {
            uri: process.env.MONGODB_URI || 'postgres://postgres:pooja@localhost:5432/postgres'
        }
    }
}

module.exports = merge(config.all, config[config.all.env])
export default module.exports
