import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MoviesModule } from './modules/movies/movies.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogService } from './shared/logger.service';
import { DataSource } from 'typeorm';
import { UsersModule } from './modules/users/users.module';
import { ProfilesModule } from './modules/profiles/profiles.module';

const MODULES = [MoviesModule, UsersModule, ProfilesModule];
const SERVICES = [LogService];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST_DOCKER,
        port: parseInt(process.env.DB_PORT) || 5432,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        migrationsRun: true,
      }),
    }),
    ...MODULES,
  ],
  controllers: [AppController],
  providers: [...SERVICES],
})
export class AppModule {
  constructor(
    private readonly logService: LogService,
    private readonly dataSource: DataSource,
  ) {
    this.checkDatabaseConnection(
      this.dataSource?.options?.type,
      this.dataSource?.isInitialized,
    );
  }

  private checkDatabaseConnection(dbType: string, isConnected: boolean) {
    isConnected &&
      this.logService.success(
        `[DATABASE - ${dbType.toUpperCase()}] Successful database connection.`,
      );
  }
}
