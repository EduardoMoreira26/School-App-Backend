import { CreateStudentInput } from './dto/create-student.input';
import { Student } from './student.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}

  async createStudent(
    createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    const { name, lastName } = createStudentInput;

    const student = this.studentRepository.create({
      id: uuid(),
      name,
      lastName,
    });

    return this.studentRepository.save(student);
  }

  async getStudent(id: string): Promise<Student> {
    return this.studentRepository.findOne({ id });
  }

  async getStudents(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  async removeStudent(id: string) {
    return await this.studentRepository.delete({ id });
  }

  async getManyStudents(studentIds: string[]): Promise<Student[]> {
    return this.studentRepository.find({
      where: {
        id: {
          $in: studentIds,
        },
      },
    });
  }

  // async updateStudent(
  //   createStudentInput: CreateStudentInput, id: string
  // ): Promise<Student> {
  //   const { name, lastName } = createStudentInput;

  //   const studentId = await this.studentRepository.findOne({ id });

  //   const student = this.studentRepository.create({
  //     name,
  //     lastName,
  //   });

  //   return this.studentRepository.save(student);
  // }
}
