import { Transform } from "class-transformer";
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
  ValidateIf,
} from "class-validator";

const trim = ({ value }: { value: unknown }) =>
  typeof value === "string" ? value.trim() : value;
// Every field is optional: it is only validated when it is sent.
const isSent = (_object: unknown, value: unknown) => value !== undefined;

export class UpdateBikeDto {
  @ValidateIf(isSent)
  @Transform(trim)
  @IsString()
  @IsNotEmpty()
  brand?: string;

  @ValidateIf(isSent)
  @Transform(trim)
  @IsString()
  @IsNotEmpty()
  model?: string;

  @ValidateIf(isSent)
  @Transform(trim)
  @IsString()
  @IsNotEmpty()
  description?: string;

  @ValidateIf(isSent)
  @Transform(trim)
  @IsString()
  @IsNotEmpty()
  category?: string;

  @ValidateIf(isSent)
  @Transform(trim)
  @IsString()
  @IsNotEmpty()
  frameMaterial?: string;

  @ValidateIf(isSent)
  @IsNumber()
  @IsPositive()
  frameSizeCm?: number;

  @ValidateIf(isSent)
  @IsNumber()
  @IsPositive()
  wheelSizeInches?: number;

  @ValidateIf(isSent)
  @IsInt()
  @IsPositive()
  gearCount?: number;

  @ValidateIf(isSent)
  @IsNumber()
  @IsPositive()
  weightKg?: number;

  @ValidateIf(isSent)
  @IsBoolean()
  electric?: boolean;

  @ValidateIf(isSent)
  @IsInt()
  @Min(0)
  priceCents?: number;
}
