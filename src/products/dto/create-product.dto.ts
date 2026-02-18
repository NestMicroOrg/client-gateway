import { Type } from "class-transformer";
import { IsNumber, IsString, Min } from "class-validator";

export class CreateProductDto {

    @IsString({ message: 'Product name must be a string' })
    public name: string;

    @IsNumber({
        maxDecimalPlaces: 4
    }, { message: 'Product price must be a number' })
    @Min(0, { message: 'Product price must be a positive number' })
    @Type(() => Number)
    public price: number;
}
