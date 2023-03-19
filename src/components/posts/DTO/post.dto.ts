import { Expose, Transform } from "class-transformer";

export class PostDTO {
  @Expose()
  caption: string

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number

  @Transform(({ obj }) => obj.comments.map(item => item.comment))
  @Expose()
  comments: string[]
}
