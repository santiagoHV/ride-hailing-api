import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import * as bcrypt from "bcryptjs";
import { User, UserRoles } from "../modules/users/user.entity"

export class MainSeeder implements Seeder{

    async seedUsers(dataSource: DataSource, factoryManager: SeederFactoryManager){
        const userRepo = dataSource.getRepository('User')
        
        const userRider = new User()
        userRider.email = "ali@cate.com"
        userRider.name = "Ali"
        userRider.lastname = "Cate"
        userRider.password = await bcrypt.hash('passwordRider', 12)
        userRider.role = UserRoles.RIDER
        userRider.actualLocationLat = 0
        userRider.actualLocationLng = 0

        const userDriver = new User()
        userDriver.email = "alan@brito.com"
        userDriver.name = "Alan"
        userDriver.lastname = "Brito"
        userDriver.password = await bcrypt.hash('passwordDriver', 12)
        userDriver.role = UserRoles.DRIVER
        userDriver.actualLocationLat = 2
        userDriver.actualLocationLng = 4

        console.log(userDriver)

        await userRepo.save(userDriver)
        await userRepo.save(userRider)
    }


    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        await this.seedUsers(dataSource, factoryManager)
    }

}