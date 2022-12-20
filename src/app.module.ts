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


@Module({
  imports: [
     TypeOrmModule.forRoot({
    type: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'Class',
    entities: [Principle,Teacher,Student,StudentTeacher],
    synchronize: true,
  }),
  ClassModule]
})
export class AppModule  implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}


