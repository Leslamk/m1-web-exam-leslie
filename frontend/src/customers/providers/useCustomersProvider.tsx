import axios from "axios";
import { useState } from "react";
import type {
  CreateCustomerModel,
  CustomerModel,
  CustomersPageModel,
} from "../models/CustomerModel";

const PAGE_SIZE = 10;

export const useCustomersProvider = () => {
  const [customers, setCustomers] = useState<CustomerModel[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZE);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const load = (
    nextPage: number = page,
    nextPageSize: number = pageSize,
  ): Promise<void> => {
    setIsLoading(true);
    return axios
      .get<CustomersPageModel>("http://localhost:3000/customers", {
        params: { page: nextPage, limit: nextPageSize },
      })
      .then((result) => {
        const lastPage = Math.max(
          1,
          Math.ceil(result.data.totalCount / nextPageSize),
        );
        // The page no longer exists (e.g. last customer of the last page deleted)
        if (nextPage > lastPage) return load(lastPage, nextPageSize);
        setCustomers(result.data.customers);
        setTotalCount(result.data.totalCount);
        setPage(nextPage);
        setPageSize(nextPageSize);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Reload the current page so the list and the total stay in sync with the backend
  const deleteCustomer = (id: string) => {
    axios.delete(`http://localhost:3000/customers/${id}`).then(() => load());
  };

  // Returns the request so the caller can react to errors (e.g. email already in use)
  const createCustomer = (input: CreateCustomerModel) =>
    axios
      .post<CustomerModel>("http://localhost:3000/customers", input)
      .then(() => load());

  return {
    customers,
    totalCount,
    page,
    pageSize,
    load,
    isLoading,
    deleteCustomer,
    createCustomer,
  };
};
