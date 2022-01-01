import { IsNotEmpty } from "class-validator";

export class CreateCommentDto {

    // title: string;

    @IsNotEmpty()
    text: string;

    @IsNotEmpty()
    postId: number;
}
