import { IsString } from "class-validator";

export class CreatePostDTO {
  @IsString()
  caption: string;
}