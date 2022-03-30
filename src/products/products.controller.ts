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
    addProduct(
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number
    ) {
        const generatedId = this.productsService.insertProduct(prodTitle, prodDesc, prodPrice);
        return {id: generatedId};
    }

    @Get()
    getAllProducts() {
        return {
            products: this.productsService.getProducts()
        }
    }

    @Get(':id')
    getProduct(@Param('id') prodId: string) {
        return {
            singleProduct: this.productsService.getSingleProduct(prodId)
        }
    }

    @Patch(':id')
    updateProduct(
        @Param('id') prodId: string,
        @Body('title') title: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number
    ) {
        this.productsService.updateProduct(prodId, title, prodDesc, prodPrice);
        return null;
    }

    @Delete(':id')
    removeProduct(@Param('id') prodId: string) {
        this.productsService.deleteProduct(prodId);
        return null;
    }
}
