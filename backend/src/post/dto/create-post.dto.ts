import { IsArray, IsOptional, IsString } from "class-validator";

export class CreatePostDto {

  @IsString()
  title: string;

  @IsArray()
  body: string;

  @IsOptional()
  @IsArray()
  category?: Array<string>;

  @IsOptional()
  @IsArray()
  tags?: string;
}
