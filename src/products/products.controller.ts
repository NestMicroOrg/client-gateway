import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor() { }

  @Post()
  createProduct() {
    return 'Product created successfully';
  }

  @Get()
  findAllProducts() {
    return 'List of all products';
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
