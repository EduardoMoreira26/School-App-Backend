/* eslint-disable prettier/prettier */
import { StudentService } from './../student/student.service';
import { CreateLessonInput } from './dto/lesson.input';
import { LessonService } from './lesson.service';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { LessonModel } from './lesson.model';
import { AssignStudentsToLessonInput } from './dto/assign-students-to-lesson.input';
import { Lesson } from './lesson.entity';

@Resolver((of) => LessonModel)
export class LessonResolver {
  constructor(
    private lessonService: LessonService,
    private studendService: StudentService
  ){}


  @Query(returns => LessonModel)
  lesson(
    @Args('id') id: string
  ){
    return this.lessonService.getLesson(id)
  }

  @Query(returns => [LessonModel])
  allLessons(){
    return this.lessonService.getLessons()
  }

  @Mutation(returns => LessonModel)
  createLesson(
    @Args('createLessonInput') createlessonInput: CreateLessonInput,
  ) {
    return this.lessonService.createLesson(createlessonInput)

  }

  @Mutation(returns => LessonModel)
  deleteLesson(
    @Args('id') id: string
  ){
    return this.lessonService.deleteLesson(id)
  }

  @Mutation(returns => LessonModel)
  assignStudentsToLesson(
    @Args('assignStudentsToLessonInput') assignStudentsToLessonInput: AssignStudentsToLessonInput,
  ) {
    const { lessonId, studentIds } = assignStudentsToLessonInput;
    return this.lessonService.assignStudentsToLesson(lessonId, studentIds);
  }

  // @Mutation(returns => LessonModel)
  // updateLesson(
  //   @Args('id') id: string,
  // ){
  //   return this.lessonService.updateLesson(id)
  // }

  @ResolveField()
  async students(@Parent() lesson: Lesson){
    return this.studendService.getManyStudents(lesson.students)
  }
}
