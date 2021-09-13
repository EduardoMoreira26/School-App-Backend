/* eslint-disable prettier/prettier */
import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType('Student')
export class StudentModel {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  // @Field()
  // lastName: string;
}