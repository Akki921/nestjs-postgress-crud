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
} from 'typeorm';
import { Principle } from './principle.model';
import { Student } from './student.model';
@Entity()
export class Teacher {
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
    description: 'designation is a required property',
  })
  @Column({ type: 'varchar' })
  designation: string;
  @ApiProperty({
    type: String,
    description: 'age is a required property',
  })
  @Column({ type: 'bigint', default: 24 })
  age: number;
  // @OneToMany((type) => Principle, (principle) => principle.id)
  // principle: Principle[];
  @ApiProperty({
    type: Number,
    description: 'principleId is a required property',
  })
  @Column({ type: 'bigint', default: 24 })
  @ManyToOne(() => Principle)
  @JoinColumn({ name: 'principleId', referencedColumnName: 'id' })
  principleId: Principle[];
  @ManyToMany(() => Student, (student) => student.teacher, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  student?: Student[];
}
