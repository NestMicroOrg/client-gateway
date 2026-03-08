import { Controller, Inject, Post, Get, Body } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { NATS_SERVICE } from 'src/config';
import { LoginUserDto, RegisterUserDto } from './dto';

@Controller('auth')
export class AuthController {

  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) { }

  @Post('register')
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.client.send('auth.register.user', registerUserDto)
      .pipe(catchError(err => { throw new RpcException(err) }));
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.client.send('auth.login.user', loginUserDto)
      .pipe(catchError(err => { throw new RpcException(err) }));
  }

  @Get('verify')
  verifyUser() {
    return this.client.send('auth.verify.user', {})
      .pipe(catchError(err => { throw new RpcException(err) }));
  }
}
