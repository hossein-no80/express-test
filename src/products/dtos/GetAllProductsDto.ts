import { IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export default class GetAllProductsDto {
   @IsOptional()
   title?: string;

   @IsOptional()
   @Type(() => Number)
   @IsNumber()
   start_price?: number;
   @IsOptional()
   @Type(() => Number)
   @IsNumber()
   end_price?: number;

   @IsOptional()
   tags?: string[];

   @IsOptional()
   @Type(() => Number)
   @IsNumber()
   page?: number;

   @IsOptional()
   @Type(() => Number)
   @IsNumber()
   page_size?: number;
}
