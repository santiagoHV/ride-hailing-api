import ormconfig from "src/ormconfig";
import { runSeeders } from "typeorm-extension";

const dataSource = ormconfig;

beforeAll(async () => {
    await dataSource.initialize()
    await dataSource.dropDatabase()
    await runSeeders(dataSource)
    console.log("Seeders run successfully")
})

afterAll(async () => {
    await dataSource.dropDatabase()
})