import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrincipleController } from 'src/controller/principle.controller';
import { StudentTeacherController } from 'src/controller/student-teacher.controller';
import { StudentController } from 'src/controller/student.controller';
import { TeacherController } from 'src/controller/teacher.controller';
import { Principle } from 'src/models/principle.model';
import { StudentTeacher } from 'src/models/student--teacher.model';
import { Student } from 'src/models/student.model';
import { Teacher } from 'src/models/teacher.model';
import { PrincipleService } from 'src/service/principle.service';
import { StudentTeacherService } from 'src/service/student-teacher.service';
import { StudentService } from 'src/service/student.service';
import { TeacherService } from 'src/service/teacher.service';
import { UtilityService } from 'src/utilities/utility';
@Module({
  imports: [TypeOrmModule.forFeature([Principle, Teacher,Student,StudentTeacher])],
  providers: [PrincipleService, TeacherService,StudentService,StudentTeacherService,UtilityService],
  controllers: [PrincipleController, TeacherController,StudentController,StudentTeacherController],
})
export class ClassModule {}
