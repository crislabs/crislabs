import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      connectionName: 'hardwareStoreDB',
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL_HARDWARE_STORE'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      connectionName: 'petDB',
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL_PET'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      connectionName: 'wearDB',
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL_WEAR'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      connectionName: 'portfolioDB',
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL_PORTFOLIO'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      connectionName: 'foodDB',
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL_FOOD'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    
  ],
})
export class MongoModule {}
