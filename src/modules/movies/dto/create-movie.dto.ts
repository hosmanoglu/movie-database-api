import { ApiProperty } from '@nestjs/swagger';
import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsNumber, IsArray, ValidateNested, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
class GenreInput {
  @ApiProperty({ example: 1 })
  @Field((type) => Int)
  @IsNumber()
  id: number;

  @ApiProperty({ example: 'Action' })
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;
}

@InputType()
export class CreateMovieDto {
  @ApiProperty({ example: 'f748adf9-5d7b-4481-95bd-18748db91bc4' })
  @Field()
  @IsUUID()
  id: string;

  @ApiProperty({ example: '123' })
  @Field()
  @IsString()
  @IsNotEmpty()
  imdbId: String;

  @ApiProperty({ example: 'Inception' })
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'A mind-bending thriller.' })
  @Field()
  @IsString()
  @IsNotEmpty()
  overview: string;

  @ApiProperty({ example: 8.8 })
  @Field((type) => Float)
  @IsNumber()
  popularity: number;

  @ApiProperty({ example: 8.8 })
  @Field((type) => Float)
  @IsNumber()
  voteAverage: number;

  @ApiProperty({ example: 20000 })
  @Field((type) => Int)
  @IsNumber()
  voteCount: number;

  @ApiProperty({ example: '2010-07-16' })
  @Field()
  @IsString()
  @IsNotEmpty()
  releaseDate: string;

  @ApiProperty({ type: [GenreInput] })
  @Field((type) => [GenreInput])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GenreInput)
  genres: GenreInput[];
}
