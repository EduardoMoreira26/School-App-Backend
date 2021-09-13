import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './lesson.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateLessonInput } from './dto/lesson.input';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
  ) {}

  async getLesson(id: string): Promise<Lesson> {
    return this.lessonRepository.findOne({ id });
  }

  async getLessons(): Promise<Lesson[]> {
    return this.lessonRepository.find();
  }

  async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
    const { name, teacherName, startDate, endDate, students } =
      createLessonInput;

    const lesson = this.lessonRepository.create({
      id: uuid(),
      name,
      teacherName,
      startDate,
      endDate,
      students,
    });

    return this.lessonRepository.save(lesson);
  }

  async assignStudentsToLesson(
    lessonId: string,
    studentIds: string[],
  ): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOne({ id: lessonId });
    lesson.students = [...lesson.students, ...studentIds];
    return this.lessonRepository.save(lesson);
  }

  async deleteLesson(id: string) {
    return await this.lessonRepository.delete({ id });
  }
}

// async updateLesson(id: string): Promise<Lesson> {
//   const lesson = await this.lessonRepository.findOne({ id });

//   const newLesson = await this.lessonRepository.update({
//     name: lesson.name,
//     startDate: lesson.startDate,
//     endDate: lesson.endDate,
//   });

//   return newLesson;
// }

// async deleteLesson(id: string) {
//   try {
//     return this.lessonRepository.delete({ id });
//   } catch (error) {
//     throw new HttpException('Nao deletou', 400);
//   }
// }
