import { Server } from 'node:http';
import productsModel from '../models/productsModel.js';
import type CreateProductsDto from './dtos/productsCreateDto.js';
import ServerError from '../errors/serverError.js';
import type GetAllProductsDto from './dtos/getAllProductsDto.js';

export const getAllProducts = async (filters: GetAllProductsDto) => {
   const { title, price, tags, page, page_size } = filters;
   const result = await productsModel.find(
      {},
      {},
      { skip: page_size * (page - 1), limit: page_size },
   );
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
