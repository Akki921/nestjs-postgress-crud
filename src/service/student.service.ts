import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentTeacher } from 'src/models/student--teacher.model';
import { Student } from 'src/models/student.model';
import { Repository } from 'typeorm';

Student;
@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}
  private readonly logger = new Logger();

  async createStudent(createStudentSchema: Student): Promise<Student> {
    this.logger.warn('createTeacherDto from servoice', createStudentSchema);
    const newStudent = await this.studentRepository.create(createStudentSchema);
    return this.studentRepository.save(newStudent);
  }

  async findAll(): Promise<Student[]> {
    const studentData = await this.studentRepository.find({
      relations: { teacher: true },
    });
    if (!studentData || studentData.length == 0) {
      throw new NotFoundException('Techer data not found!');
    }
    return studentData;
  }

  async getStudent(StudentId: number): Promise<Student> {
    Logger.warn('StudentId', StudentId);
    const existingStudent = await this.studentRepository.findOne({
      relations: { teacher: true },
      where: { id: StudentId },
    });
    if (!existingStudent) {
      throw new NotFoundException(`Student #${StudentId} not found`);
    }
    return existingStudent;
  }

  //   async remove(id: string): Promise<void> {
  //     await this.teacherRepository.delete(id);
  //   }
}
