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
import { Student } from 'src/models/student.model';
import { StudentService } from 'src/service/student.service';
import { UtilityService } from 'src/utilities/utility';

@ApiTags('student')
@Controller('student')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly utilityService: UtilityService,
  ) {}
  private readonly logger = new Logger();

  @Post()
  @ApiCreatedResponse({ description: 'Created Succesfully' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async createStudent(@Res() response, @Body() creatStudentSchema: Student) {
    try {
      Logger.log('creatStudentSchema', creatStudentSchema);

      const newStudent = await this.studentService.createStudent(
        creatStudentSchema,
      );
      return response.status(HttpStatus.CREATED).json({
        message: 'Student has been created successfully',
        newStudent,
      });
    } catch (err) {
      return response
        .status(400)
        .json(this.utilityService.getErrorResponse(err.status, err.message));
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
  async getStudents(@Res() response) {
    try {
      this.logger.warn('log from controller');

      const studentData = await this.studentService.findAll();
      return response.status(HttpStatus.OK).json({
        message: 'All Students data found successfully',
        studentData,
      });
    } catch (err) {
      return response
        .status(400)
        .json(this.utilityService.getErrorResponse(err.status, err.message));
    }
  }

  @Get('/:id')
  @ApiOkResponse({ description: 'Data Retrive Succesfully' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async getStudent(@Res() response, @Param('id') StudentId: number) {
    try {
      const existingStudent = await this.studentService.getStudent(StudentId);
      return response.status(HttpStatus.OK).json({
        message: 'Student found successfully',
        existingStudent,
      });
    } catch (err) {
      return response
        .status(400)
        .json(this.utilityService.getErrorResponse(err.status, err.message));
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
