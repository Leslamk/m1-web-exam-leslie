import type { CustomersPageModel } from "../models/customer.model";
import { CustomerResponseDto } from "./customer-response.dto";

export class CustomersPageResponseDto {
  totalCount: number;
  customers: CustomerResponseDto[];

  static fromModel(model: CustomersPageModel): CustomersPageResponseDto {
    return Object.assign(new CustomersPageResponseDto(), {
      totalCount: model.totalCount,
      customers: model.customers.map((customer) =>
        CustomerResponseDto.fromModel(customer),
      ),
    });
  }
}
