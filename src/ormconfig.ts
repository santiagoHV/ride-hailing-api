import { ConfigModule, ConfigService } from "@nestjs/config";
import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";
import { MainSeeder } from "./seeding/initialSeeder";

ConfigModule.forRoot({
    envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
});

const configService = new ConfigService();

const config: DataSourceOptions & SeederOptions = {
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
    migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
    seeds: [MainSeeder],
};
console.log(__dirname + '/migrations/**/*{.ts,.js}');


export default new DataSource(config);
