import { ObjectType, Field, Int, Float, ID } from '@nestjs/graphql';

@ObjectType()
class Genre {
  @Field((type) => Int)
  id: number;

  @Field()
  name: string;
}

@ObjectType()
export class Movie {
  @Field((type) => ID)
  id: string;

  @Field()
  imdbId: String;

  @Field()
  name: string;

  @Field()
  overview: string;

  @Field((type) => Float)
  popularity: number;

  @Field((type) => Float)
  voteAverage: number;

  @Field((type) => Int)
  voteCount: number;

  @Field()
  releaseDate: string;

  @Field((type) => [Genre])
  genres: Genre[];
}
