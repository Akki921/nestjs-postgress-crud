import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  Logger,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { StudentTeacher } from 'src/models/student--teacher.model';
import { StudentTeacherService } from 'src/service/student-teacher.service';

@ApiTags('student-teacher')
@Controller('student-teacher')
export class StudentTeacherController {
  constructor(private readonly studenteacherService: StudentTeacherService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Created Succesfully' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async createStudentTeacher(
    @Res() response,
    @Body() createStudentTeacher: StudentTeacher,
  ) {
    try {
      Logger.log('creatStudentSchema', createStudentTeacher);

      const newStudentTeacher =
        await this.studenteacherService.createStudentTecher(
          createStudentTeacher,
        );
      return response.status(HttpStatus.CREATED).json({
        message: 'Student has been created successfully',
        newStudentTeacher,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Teacher not created!',
        error: 'Bad Request',
      });
    }
  }

  @Get()
  @ApiOkResponse({ description: 'Data Retrive Succesfully' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async getStudentTeachers(@Res() response) {
    try {
      Logger.log('log from controller');

      const studentTeachresData = await this.studenteacherService.findAll();
      return response.status(HttpStatus.OK).json({
        message: 'All StudentTeachers data found successfully',
        studentTeachresData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  @ApiOkResponse({ description: 'Data Retrive Succesfully' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async getStudentTeacher(@Res() response, @Param('id') TeacherId: number) {
    try {
      const existingStudent =
        await this.studenteacherService.findStudentfromTeacher(TeacherId);
      return response.status(HttpStatus.OK).json({
        message: 'Student found successfully',
        existingStudent,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
