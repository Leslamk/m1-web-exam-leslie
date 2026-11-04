import type { BikesPageModel } from "../models/bike.model";
import { BikeResponseDto } from "./bike-response.dto";

export class BikesPageResponseDto {
  totalCount: number;
  bikes: BikeResponseDto[];

  static fromModel(model: BikesPageModel): BikesPageResponseDto {
    return Object.assign(new BikesPageResponseDto(), {
      totalCount: model.totalCount,
      bikes: model.bikes.map((bike) => BikeResponseDto.fromModel(bike)),
    });
  }
}
