import { runSeeders } from "typeorm-extension";
import ormconfig from "../ormconfig";

const dataSource = ormconfig

dataSource.initialize().then(async () =>{
    await runSeeders(dataSource)
    console.log("Seeders run successfully")
    process.exit()
})