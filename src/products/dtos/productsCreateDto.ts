import { IsDefined, IsOptional, MaxLength } from 'class-validator';

export default class CreateProductsDto {
   @MaxLength(30)
   @IsDefined()
   title: string;

   @IsDefined()
   description: string;

   @IsDefined()
   price: number;

   @IsOptional()
   tags: string[];

   @IsDefined()
   user: string;
}
