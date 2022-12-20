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
  JoinTable,
} from 'typeorm';
import { Principle } from './principle.model';
import { Teacher } from './teacher.model';
@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({
    type: String,
    description: 'name is a required property',
  })
  @Column({ type: 'varchar' })
  name: string;
  @ApiProperty({
    type: Number,
    description: 'rollno is a required property',
  })
  @Column({ type: 'bigint', unique: true })
  rollno: number;
  @ApiProperty({
    type: Number,
    description: 'age is a required property',
  })
  @Column({ type: 'bigint', default: 24 })
  age: number;
  @ApiProperty({
    type: Number,
    description: 'marks is a required property',
  })
  @Column({ type: 'bigint' })
  marks: number;
  @ManyToMany(
    () => Teacher,
    (teacher) => teacher.id, //optional
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinTable({
    name: 'student_teacher',
    joinColumn: {
      name: 'student_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'teacher_id',
      referencedColumnName: 'id',
    },
  })
  teacher?: Teacher[];
}
