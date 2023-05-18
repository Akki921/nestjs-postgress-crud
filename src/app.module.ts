import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './models/teacher.model';
import { ClassModule } from './module/teacher.module';
import { Principle } from './models/principle.model';
import { Student } from './models/student.model';
import { StudentTeacher } from './models/student--teacher.model';
import { LoggerMiddleware } from './logger/middleware.logger';
import {
  AcceptLanguageResolver,
  I18nModule,
  QueryResolver,
  I18nJsonLoader,
} from 'nestjs-i18n';
import * as path from 'path';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'Class',
      entities: [Principle, Teacher, Student, StudentTeacher],
      synchronize: true,
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      fallbacks:{
        'en-*': 'en',
        'fr-*': 'fr',
      },
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      loader: I18nJsonLoader,
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
      typesOutputPath: path.join(__dirname, '../src/generated/i18n.generated.ts'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClassModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
