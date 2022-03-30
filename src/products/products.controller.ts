/* eslint-disable prettier/prettier */
import { 
    Controller,
    Post,
    Body,
    Param,
    Get,
    Patch,
    Delete
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    async addProduct(
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number
    ) {
        const generatedId = await this.productsService.insertProduct(prodTitle, prodDesc, prodPrice);
        return {id: generatedId};
    }

    @Get()
    async getAllProducts() {
        return await this.productsService.getProducts();
    }

    @Get(':id')
    async getProduct(@Param('id') prodId: string) {
        return await this.productsService.getSingleProduct(prodId);
    }

    @Patch(':id')
    updateProduct(
        @Param('id') prodId: string,
        @Body('title') title: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number
    ) {
        return this.productsService.updateProduct(prodId, title, prodDesc, prodPrice);
    }

    @Delete(':id')
    async removeProduct(@Param('id') prodId: string) {
        return await this.productsService.deleteProduct(prodId);
    }
}