import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import * as bcrypt from "bcryptjs";
import { User, UserRoles } from "../modules/users/user.entity"
import { PaymentSource } from "../modules/payment-sources/entities/paymentSource.entity";
import { Ride, RideStatus } from "../modules/rides/ride.entity";
import { Payment, PaymentStatus } from "../modules/payment-sources/entities/payment.entity";

export class MainSeeder implements Seeder{

    async seedUsers(dataSource: DataSource, factoryManager: SeederFactoryManager){
        const userRepo = dataSource.getRepository('User')
        const paymentSourceRepo = dataSource.getRepository('PaymentSource')
        const rideRepo = dataSource.getRepository('Ride')
        const paymentRepo = dataSource.getRepository('Payment')

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

        await userRepo.save(userDriver)
        await userRepo.save(userRider)

        const paymentSource = new PaymentSource()
        paymentSource.externalId = "123456789"
        paymentSource.lastFour = 1234
        paymentSource.brand = "Visa"
        paymentSource.user = userRider

        await paymentSourceRepo.save(paymentSource)

        const ride = new Ride()
        ride.startLat = 0
        ride.startLng = 0
        ride.endLat = 1
        ride.endLng = 1
        ride.rider = userRider
        ride.startTime = new Date('2021-01-01 00:00:00')
        ride.endTime = new Date('2021-01-01 00:05:00')
        ride.driver = userDriver
        ride.status = RideStatus.FINISHED

        await rideRepo.save(ride)

        console.log(ride)
        console.log(paymentSource)

        const payment = new Payment()
        payment.amount = 5000
        payment.currency = "COP"
        payment.creationDate = new Date('2021-01-01 00:05:00')
        payment.cancellationDate = null
        payment.status = PaymentStatus.PENDING
        payment.paymentSource = paymentSource

        await paymentRepo.save(payment) 

        ride.payment = payment
        await rideRepo.save(ride)
        

    }


    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        await this.seedUsers(dataSource, factoryManager)
    }

}