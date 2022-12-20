import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Teacher } from './teacher.model';
@Entity()
export class Principle {
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({
    type: String,
    description: 'name is a required property',
  })
  @Column({ type: 'varchar' })
  name: string;
  @ApiProperty({
    type: String,
    description: 'designation This is a required property',
  })
  @Column({ type: 'varchar' })
  designation: string;
  @ApiProperty({
    type: Number,
    description: 'age is a required property',
  })
  @Column({ type: 'bigint', default: 24 })
  age: number;
  @OneToMany((type) => Teacher, (teacher) => teacher.principleId)
  teacher: Teacher[];
}
