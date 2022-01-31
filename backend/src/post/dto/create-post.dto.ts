import { IsArray, IsOptional, IsString } from "class-validator";

export class CreatePostDto {

  @IsString()
  title: string;

  @IsArray()
  body: any[];

  @IsOptional()
  @IsArray()
  category?: Array<string>;

  @IsOptional()
  @IsArray()
  tags?: string;
}
