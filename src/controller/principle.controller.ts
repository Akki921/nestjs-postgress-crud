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
import { Principle } from 'src/models/principle.model';
import { PrincipleService } from 'src/service/principle.service';
import { UtilityService } from 'src/utilities/utility';

@ApiTags('principle')
@Controller('principle')
export class PrincipleController {
  constructor(
    private readonly principleService: PrincipleService,
    private readonly utilityService: UtilityService,
  ) {}

  @Post()
  @ApiCreatedResponse({ description: 'Created Succesfully' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async createPrinciple(
    @Res() response,
    @Body() creatPrincipleSchema: Principle,
  ) {
    try {
      Logger.log('creatPrincipleDto', creatPrincipleSchema);

      const newPrinciple = await this.principleService.createPrinciple(
        creatPrincipleSchema,
      );
      return response.status(HttpStatus.CREATED).json({
        message: 'Principle has been created successfully',
        newPrinciple,
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
  async getPrinciples(@Res() response) {
    try {
      Logger.log('log from controller');

      const principleData = await this.principleService.findAllPrinciple();
      return response
        .status(HttpStatus.OK)
        .json(this.utilityService.getOkResponse(principleData));
      // .json({
      //   message: 'All Principle data found successfully',
      //   principleData,
      // });
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
  async getPrinciple(@Res() response, @Param('id') PrincipleId: number) {
    try {
      const existingPrinciple = await this.principleService.getPrinciple(
        PrincipleId,
      );
      return response
        .status(HttpStatus.OK)
        .json(this.utilityService.getOkResponse(existingPrinciple));
      // json({
      //   message: 'Principle found successfully',
      //   existingPrinciple,
      // });
    } catch (err) {
      Logger.log('err from catch');
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
