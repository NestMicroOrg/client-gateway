import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PRODUCT_SERVICE } from 'src/config';

@Controller('products')
export class ProductsController {

  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy
  ) { }

  @Post()
  createProduct() {
    return 'Product created successfully';
  }

  @Get()
  findAllProducts() {
    return this.productsClient.send({ cmd: 'get_all_products' }, {});
  }

  @Get(':id')
  findProductById(@Param('id') id: string) {
    return `Product details for ID: ${id}`;
  }

  @Patch(':id')
  updateProduct(@Param('id') id: string, @Body() updateData: any) {
    return `Product with ID: ${id} updated successfully`;
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return `Product with ID: ${id} deleted successfully`;
  }
}
