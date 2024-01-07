import { ConfigModule, ConfigService } from "@nestjs/config";
import { DataSource, DataSourceOptions } from "typeorm";

ConfigModule.forRoot({
    envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
});

const configService = new ConfigService();

const config: DataSourceOptions = {
    type: 'postgres',
    host: configService.get('TYPEORM_HOST'),
    port: +configService.get<number>('TYPEORM_PORT'),
    username: configService.get('TYPEORM_USERNAME'),
    password:   configService.get('TYPEORM_PASSWORD'),
    database:   configService.get('TYPEORM_DATABASE'),
    entities: [__dirname + '/modules/**/*.entity{.ts,.js}'],
    synchronize: false,
    migrationsRun: true,
    logging: true,
    migrations: [__dirname + '/../src/migrations/**/*{.ts,.js}'],
};
console.log(__dirname + '/migrations/**/*{.ts,.js}');


export default new DataSource(config);
