import { Module } from "@nestjs/common";
import { WompiApiService } from "./wompiApi.service";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [
        ConfigModule
    ],
    controllers: [],
    providers: [
        WompiApiService
    ],
    exports: [
        WompiApiService
    ]
})
export class WompiApiModule{}
