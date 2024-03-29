import ormconfig from "../ormconfig";

const dataSource = ormconfig

dataSource.initialize().then(async () =>{
    //clean db
    await dataSource.query('SET CONSTRAINTS ALL DEFERRED')
    await dataSource.query('DELETE FROM "payment"')
    await dataSource.query('DELETE FROM "user"')
    await dataSource.query('DELETE FROM "payment_source"')
    await dataSource.query('DELETE FROM "ride"')
    await dataSource.query('SET CONSTRAINTS ALL IMMEDIATE')

    console.log("Data base cleaned successfully")
    process.exit()
    
})