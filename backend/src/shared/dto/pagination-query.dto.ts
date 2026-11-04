import { Type } from "class-transformer";
import { IsInt, IsOptional, Max, Min } from "class-validator";

// Query params arrive as strings: @Type converts them to numbers before validation.
export class PaginationQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit: number = 10;
}
