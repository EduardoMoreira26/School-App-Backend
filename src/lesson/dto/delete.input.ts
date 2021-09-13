/* eslint-disable prettier/prettier */
import { InputType, Field, ID } from '@nestjs/graphql';
import { isUUID } from 'class-validator';

@InputType()
export class RemoveLessonInput {
  @Field(type => ID)
  id: string;
}
