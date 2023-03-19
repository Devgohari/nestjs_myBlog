import { Expose } from "class-transformer";
import { IsString, IsEmail, IsNumber, IsOptional } from "class-validator";

export class userLoginDTO {
  @Expose()
  @IsEmail()
  email: string;
  
  @Expose()
  @IsString()
  password: string;
  
  @IsNumber()
  @IsOptional()
  id:number

}