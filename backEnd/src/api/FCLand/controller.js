import {User} from ".";
import {sign, verify} from "../../services/jwt";
import {success} from "../../services/response";

var pg = require("pg");
var connectionString = "postgres://postgres:123456@18.144.45.211:5432/postgres";

export const findPid = ({body, params}, res, next) => {
    console.log('body api', body);
    pg.connect(connectionString, function (err, client, done) {
        if (err) {
            console.log("not able to get connection " + err);
            res.status(400).send(err);
        } else {
            let query = 'select pid,mun,tract,block,lot,"Parcel_Source_Search",pun,unit from public."FCLand_Parcel"';
            let where = null;
            let data = [];
            if (body.mun) {
                if (body.mun.includes('%')) {
                    console.log('% yes')
                    if (where === null) {
                        data.push(body.mun);
                        where = ' where mun like $' + (data.indexOf(body.mun) + 1)
                    } else {
                        data.push(body.mun);
                        where += ' and mun like $' + (data.indexOf(body.mun) + 1)
                    }
                } else {
                    if (where === null) {
                        data.push(body.mun);
                        where = ' where mun = $' + (data.indexOf(body.mun) + 1)
                    } else {
                        data.push(body.mun);
                        where += ' and mun = $' + (data.indexOf(body.mun) + 1)
                    }
                }
            }
            if (body.tract) {
                if (body.tract.includes('%')) {
                    console.log('% yes')
                    if (where === null) {
                        data.push(body.tract);
                        where = ' where tract like $' + (data.indexOf(body.tract) + 1)
                    } else {
                        data.push(body.tract);
                        where += ' and tract like $' + (data.indexOf(body.tract) + 1)
                    }
                } else {
                    if (where === null) {
                        data.push(body.tract);
                        where = ' where tract = $' + (data.indexOf(body.tract) + 1)
                    } else {
                        data.push(body.tract);
                        where += ' and tract = $' + (data.indexOf(body.tract) + 1)
                    }
                }
            }
            if (body.block) {
                if (body.block.includes('%')) {
                    console.log('% yes')
                    if (where === null) {
                        data.push(body.block);
                        where = ' where block like $' + (data.indexOf(body.block) + 1)
                    } else {
                        data.push(body.block);
                        where += ' and block like $' + (data.indexOf(body.block) + 1)
                    }
                } else {
                    if (where === null) {
                        data.push(body.block);
                        where = ' where block = $' + (data.indexOf(body.block) + 1)
                    } else {
                        data.push(body.block);
                        where += ' and block = $' + (data.indexOf(body.block) + 1)
                    }
                }
            }
            if (body.lot) {
                if (body.lot.includes('%')) {
                    console.log('% yes')
                    if (where === null) {
                        data.push(body.lot);
                        where = ' where lot like $' + (data.indexOf(body.lot) + 1)
                    } else {
                        data.push(body.lot);
                        where += ' and lot like $' + (data.indexOf(body.lot) + 1)
                    }
                } else {
                    if (where === null) {
                        data.push(body.lot);
                        where = ' where lot = $' + (data.indexOf(body.lot) + 1)
                    } else {
                        data.push(body.lot);
                        where += ' and lot = $' + (data.indexOf(body.lot) + 1)
                    }
                }
            }
            console.log(data.indexOf(body.lot))
            if (where != null) {
                // and tract != 'T0' and block != 'B0'
                where += ' and pid is not null and pid != \'0\' group by pid,mun,tract,block,lot,"Parcel_Source_Search",pun,unit order by mun desc'
                query += where;
            } else {
                where = ' where pid is not null and pid != \'0\' group by pid,mun,tract,block,lot,"Parcel_Source_Search",pun,unit order by mun desc'
                query += where;
            }
            console.log('data', data);
            console.log('query', query);
            client.query(query, data, function (err, result) {
                done(); // closing the connection;
                if (err) {
                    console.log('here', err);
                    res.status(400).send(err);
                } else {
                    let final = {
                        total: result.rows.length,
                        pid: result.rows
                    }
                    res.status(200).send(final);
                }
            });
        }
    })
}

export const showfeatures = ({body, params}, res, next) => {
    pg.connect(connectionString, function (err, client, done) {
        if (err) {
            console.log("not able to get connection " + err);
            res.status(400).send(err);
        } else {
            let query = 'select "FeatureTypeName","Feature", "FeatureTypeID" from public."FCLand_parcel_features_report"';
            let where = null;
            let data = [];
            if (typeof(body.pid) === "object") {
                for (let i = 0; i < body.pid.length; i++) {
                    if (where === null) {
                        data.push(body.pid[i]);
                        where = ' where "PID" IN ($' + (data.indexOf(body.pid[i]) + 1)
                    } else {
                        data.push(body.pid[i]);
                        where += ' , $' + (data.indexOf(body.pid[i]) + 1)
                    }
                }
            }
            else {
                if (where === null) {
                    data.push(body.pid);
                    where = ' where "PID" IN ($' + (data.indexOf(body.pid) + 1)
                } else {
                    data.push(body.pid);
                    where += ' , $' + (data.indexOf(body.pid) + 1)
                }
            }
            if (where !== null) {
                where += ') group by "FeatureTypeID", "FeatureTypeName","Feature"'
                query += where;
            }
            console.log('data', data);
            console.log('query', query);
            client.query(query, data, function (err, result) {
                done(); // closing the connection;
                if (err) {
                    console.log('here', err);
                    res.status(400).send(err);
                } else {
                    let query2 = 'select mun,tract,block,lot,pid,"Parcel_Source_Search",pun from public."FCLand_Parcel" where pid = $1 group by mun,tract,block,pid,lot,"Parcel_Source_Search",pun'
                    client.query(query2, [body.pid], function (err, secondResult) {
                        done(); // closing the connection;
                        if (err) {
                            console.log('here', err);
                            res.status(400).send(err);
                        } else {
                            console.log('se',secondResult.rows)
                            console.log('result',result.rows)

                            let final = {
                                mun: secondResult.rows[0].mun,
                                tract: secondResult.rows[0].tract,
                                block: secondResult.rows[0].block,
                                lot: secondResult.rows[0].lot,
                                pun: secondResult.rows[0].pun,
                                Parcel_Source_Search: secondResult.rows[0].Parcel_Source_Search,
                                total: result.rows.length,
                                features: result.rows
                            }
                            res.status(200).send(final);
                        }
                    })

                }
            });
        }
    })
}