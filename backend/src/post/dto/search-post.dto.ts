enum PostViewsEnum {
  DESC = 'DESC',
  ASC = 'ASC',
}

export class SearchPostDto {
  title?: string;

  body?: string;

  views?: 'DESC' | 'ASC';

  limit?: number;

  take?: number;

  tag?: string;
}
