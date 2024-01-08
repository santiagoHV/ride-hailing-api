import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from './ormconfig';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { RidesModule } from './modules/rides/rides.module';
import { AuthModule } from './modules/auth/auth.module';
import { PaymentModule } from './modules/payment-sources/payment.module';
import { WompiService } from './services/wompi/wompi.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const options = (await ormconfig.initialize()).options;
        return { autoLoadEntities: true, ...options };
      },
    }),
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      isGlobal: true,
    }),
    UsersModule,
    RidesModule,
    AuthModule,
    PaymentModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    WompiService
  ],
})
export class AppModule implements OnModuleInit {
  onModuleInit() {
    try{
      console.log('Database connection established');
    }catch(err){
      console.log('Database connection failed');
      console.log(err);
    }
  }
}
