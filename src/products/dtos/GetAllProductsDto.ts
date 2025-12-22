import { IsOptional } from 'class-validator';

export default class GetAllProductsDto {
   @IsOptional()
   title: string;

   @IsOptional()
   price: number;

   @IsOptional()
   tags: string[];

   @IsOptional()
   page: number;

   @IsOptional()
   page_size: number;
}
