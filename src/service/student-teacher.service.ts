import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentTeacher } from 'src/models/student--teacher.model';
import { Student } from 'src/models/student.model';
import { Repository } from 'typeorm';

StudentTeacher;
@Injectable()
export class StudentTeacherService {
  constructor(
    @InjectRepository(StudentTeacher)
    private studentteacherRepository: Repository<StudentTeacher>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async createStudentTecher(
    createStudentTeacher: StudentTeacher,
  ): Promise<StudentTeacher> {
    Logger.log(
      'createStudentTeacherSchema from servoice',
      createStudentTeacher,
    );
    const Student = await this.studentRepository.findOne({
      where: { id: createStudentTeacher.studentId },
    });
    Logger.log('Student', Student);
    if (!Student) {
      throw new NotFoundException();
    }
    const newStudentTeacher = await this.studentteacherRepository.save(
      createStudentTeacher,
    );
    return this.studentteacherRepository.save(newStudentTeacher);
  }

  async findAll(): Promise<StudentTeacher[]> {
    const studentData = await this.studentteacherRepository.find({
      relations: { teachers: true, students: true },
    });
    if (!studentData || studentData.length == 0) {
      throw new NotFoundException('Techer data not found!');
    }
    return studentData;
  }

  async findStudentfromTeacher(TeacherId: number): Promise<StudentTeacher[]> {
    const TeacherData = await this.studentteacherRepository.find({
      relations: { students: true },
      where: { teacherId: TeacherId },
    });
    if (!TeacherData) {
      throw new NotFoundException('Techer data not found!');
    }
    return TeacherData;
  }
}
