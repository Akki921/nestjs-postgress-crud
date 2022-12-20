import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from 'src/models/teacher.model';
import { Repository } from 'typeorm';

Teacher;
@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
  ) {}

  async createTeacher(createTeacherSchema: Teacher): Promise<Teacher> {
    Logger.log('createTeacherDto from servoice', createTeacherSchema);
    const newTeacher = await this.teacherRepository.create(createTeacherSchema);
    return this.teacherRepository.save(newTeacher);
  }

  async findAll(): Promise<Teacher[]> {
    const teacherData = await this.teacherRepository.find({
      relations: { principleId: true },
    });
    if (!teacherData || teacherData.length == 0) {
      throw new NotFoundException('Techer data not found!');
    }
    return teacherData;
  }

  async getTeacher(TeacherId: number): Promise<Teacher> {
    Logger.warn('TeacherId', TeacherId);
    const existingTeacher = await this.teacherRepository.findOne({
      relations: { principleId: true },
      where: { id: TeacherId },
    });
    if (!existingTeacher) {
      throw new NotFoundException(`Teacher #${TeacherId} not found`);
    }
    return existingTeacher;
  }

  //   async remove(id: string): Promise<void> {
  //     await this.teacherRepository.delete(id);
  //   }
}
