/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
    private products: Product[] = [];

    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}

    async insertProduct(title: string, description: string, price: number) {
        const newProduct = new this.productModel({
            title: title,
            description: description,
            price: price
        });
        const result = await newProduct.save();
        return result.id as string;
    }

    async getProducts() {
        const products = await this.productModel.find().exec();
        return products.map(product => ({
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price
        }));
    }

    async getSingleProduct(productId: string) {
        const product =await this.findProduct(productId);
        return {
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price
        };
    }

    async updateProduct(productId: string, title: string, description: string, price: number) {
        const product = await this.findProduct(productId);
        if(title) {
            product.title = title;
        }
        if(description) {
            product.description = description;
        }
        if(price) {
            product.price = price;
        }
        product.save();
        return product;
    }

    async deleteProduct(productId: string) {
        await this.productModel.deleteOne({id: productId}).exec();
        return 'deleted';
    }

    private async findProduct(id: string): Promise<Product> {
        try {
            const product = await this.productModel.findById(id);
            if(!product) {
                throw new NotFoundException('Product not found with this Id');
            }
            return product;
        } catch (error) {
            throw new NotFoundException('Product not found with this Id');
        }
    }
}