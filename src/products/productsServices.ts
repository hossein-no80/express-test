import productsModel from '../models/productsModel.js';
import type CreateProductsDto from './dtos/productsCreateDto.js';
import ServerError from '../errors/serverError.js';
import type GetAllProductsDto from './dtos/GetAllProductsDto.js';

export const getAllProducts = async (filters: GetAllProductsDto) => {
   const { start_price, end_price, tags, page = 1, page_size = 5 } = filters;

   const query: Record<string, any> = {};

   // tags filter
   if (tags) {
      const tagsArray = Array.isArray(tags) ? tags : [tags];
      query.tags = { $in: tagsArray };
   }

   // price range filter
   if (start_price !== undefined && end_price !== undefined) {
      const min = Number(start_price);
      const max = Number(end_price);

      if (!isNaN(min) && !isNaN(max)) {
         query.price = { $gte: min, $lte: max };
      }
   }

   const result = await productsModel
      .find(query)
      .skip(page_size * (page - 1))
      .limit(page_size);

   return result;
};

export const createNewProducts = async (data: CreateProductsDto) => {
   const result = await productsModel.create(data);
   return result;
};

export const updateProducts = async (id: string, data: CreateProductsDto) => {
   const updatedProduct = await productsModel.findOneAndUpdate(
      { _id: id, user: data.user },
      data,
      { new: true },
   );

   if (!updatedProduct) {
      throw new ServerError(404, 'Product not found');
   }

   return updatedProduct;
};

export const deleteProducts = async (id: string, user: string) => {
   const deletedProduct = await productsModel.findOneAndDelete({
      _id: id,
      user,
   });

   if (!deletedProduct) {
      throw new ServerError(404, 'Product not found');
   }

   return deletedProduct;
};

export const getOneProducts = async (id: string) => {
   const result = await productsModel.findById(id);

   if (!result) {
      throw new ServerError(404, 'Product not found');
   }

   return result;
};
