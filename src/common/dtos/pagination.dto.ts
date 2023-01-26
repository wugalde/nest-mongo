import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto{
    
    @IsPositive()
    @IsOptional()
    @IsNumber()
    @Min(1)
    limit: number;

    @IsPositive()
    @IsNumber()
    @IsOptional()
    offset: number;
}