/* eslint-disable prettier/prettier */
import { CreateStudentInput } from './dto/create-student.input';
import { Args, Mutation, Query } from '@nestjs/graphql';
import { StudentModel } from './student.model';
import { Resolver } from '@nestjs/graphql';
import { StudentService } from './student.service';

@Resolver((of) => StudentModel)
export class StudentResolver {
  constructor(
    private studentService: StudentService
  ){}

  @Mutation(returns => StudentModel)
  createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ) {
    return this.studentService.createStudent(createStudentInput)
  }

  @Query(returns => StudentModel)
  getStudent(
    @Args('id') id: string,
  ){
    return this.studentService.getStudent(id)
  }

  @Query(returns => [StudentModel])
  getStudents(){
    return this.studentService.getStudents()
  }

  @Mutation(returns => StudentModel)
  removeStudent(
    @Args('id') id: string,
  ) {
    return this.studentService.removeStudent(id)
  }
}