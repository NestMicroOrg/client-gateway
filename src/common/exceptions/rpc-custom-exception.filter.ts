import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {

    catch(exception: RpcException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        const rpcError = exception.getError();

        let status = 500;
        let message = 'Internal server error';

        if (typeof rpcError === 'object' && rpcError !== null) {
            if ('status' in rpcError && Number.isInteger(rpcError.status)) {
                status = rpcError.status as number;
            }
            if ('message' in rpcError) {
                message = rpcError.message as string;
            }
        }

        response.status(status).json({
            status,
            message,
        });
    }
}