import { ApiProperty } from '@nestjs/swagger';
import { type } from 'os';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  PrimaryColumn,
} from 'typeorm';
import { Student } from './student.model';
import { Teacher } from './teacher.model';
@Entity('student_teacher')
export class StudentTeacher {
  @ApiProperty({
    type: Number,
    description: 'studentId is a required property',
  })
  @PrimaryColumn({ name: 'student_id' })
  studentId: number;
  @ApiProperty({
    type: Number,
    description: 'teacherId is a required property',
  })
  @PrimaryColumn({ name: 'teacher_id' })
  teacherId: number;

  @ManyToOne(() => Student, (student) => student.teacher, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'student_id', referencedColumnName: 'id' }])
  students: Student[];
  @ManyToOne(() => Teacher, (teacher) => teacher.student, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'teacher_id', referencedColumnName: 'id' }])
  teachers: Teacher[];
}
