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
import { Teacher } from 'src/models/teacher.model';
import { TeacherService } from 'src/service/teacher.service';
@ApiTags('teacher')
@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Created Succesfully' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async createTeacher(@Res() response, @Body() creatTeacherSchema: Teacher) {
    try {
      Logger.log('creatTeacherDto', creatTeacherSchema);

      const newTeacher = await this.teacherService.createTeacher(
        creatTeacherSchema,
      );
      return response.status(HttpStatus.CREATED).json({
        message: 'Teacher has been created successfully',
        newTeacher,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Teacher not created!',
        error: 'Bad Request',
      });
    }
  }
  // @Put('/:id')
  // async updateStudent(
  //   @Res() response,
  //   @Param('id') studentId: string,
  //   @Body() updateStudentDto: UpdateStudentDto,
  // ) {
  //   try {
  //     const existingStudent = await this.studentService.updateStudent(
  //       studentId,
  //       updateStudentDto,
  //     );
  //     return response.status(HttpStatus.OK).json({
  //       message: 'Student has been successfully updated',
  //       existingStudent,
  //     });
  //   } catch (err) {
  //     return response.status(err.status).json(err.response);
  //   }
  // }

  @Get()
  @ApiOkResponse({ description: 'Data Retrive Succesfully' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async getTeachers(@Res() response) {
    try {
      Logger.log('log from controller');

      const teacherData = await this.teacherService.findAll();
      return response.status(HttpStatus.OK).json({
        message: 'All Teachers data found successfully',
        teacherData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  @ApiOkResponse({ description: 'Data Retrive Succesfully' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async getTeacher(@Res() response, @Param('id') TeacherId: number) {
    try {
      const existingTeacher = await this.teacherService.getTeacher(TeacherId);
      return response.status(HttpStatus.OK).json({
        message: 'Teacher found successfully',
        existingTeacher,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  // @Delete('/:id')
  // async deleteStudent(@Res() response, @Param('id') studentId: string) {
  //   try {
  //     const deletedStudent = await this.studentService.deleteStudent(studentId);
  //     return response.status(HttpStatus.OK).json({
  //       message: 'Student deleted successfully',
  //       deletedStudent,
  //     });
  //   } catch (err) {
  //     return response.status(err.status).json(err.response);
  //   }
  // }
}
