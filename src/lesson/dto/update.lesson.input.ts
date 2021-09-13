/* eslint-disable prettier/prettier */
import { Field, InputType } from "@nestjs/graphql";
import { MinLength, IsDateString } from 'class-validator'

@InputType()
export class UpdateLessonInput {
  @Field()
  id: string;

  @MinLength(1)
  @Field()
  name: string;

  @MinLength(1)
  @Field()
  teacherName: string;

  @IsDateString()
  @Field()
  startDate: string;

  @IsDateString()
  @Field()
  endDate: string;
}