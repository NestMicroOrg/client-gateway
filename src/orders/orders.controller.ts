import { Controller, Get, Post, Body, Param, Inject, Query, ParseUUIDPipe, Patch } from '@nestjs/common';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { CreateOrderDto, OrderPaginationDto, StatusDto } from './dto';

@Controller('orders')
export class OrdersController {

  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) { }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.client.send('createOrder', createOrderDto)
      .pipe(catchError(err => { throw new RpcException(err) }));
  }

  @Get()
  findAll(@Query() paginationDto: OrderPaginationDto) {
    return this.client.send('findAllOrders', paginationDto)
      .pipe(catchError(err => { throw new RpcException(err) }));
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.client.send('findOneOrder', { id })
      .pipe(catchError(err => { throw new RpcException(err) }));
  }

  @Patch(':id')
  changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() status: StatusDto
  ) {
    return this.client.send('changeOrderStatus', { id, status: status.status })
      .pipe(catchError(err => { throw new RpcException(err) }));
  }
}
