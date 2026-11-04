import axios from "axios";
import { useState } from "react";
import type {
  BikeModel,
  BikesPageModel,
  CreateBikeModel,
} from "../models/BikeModel";

const PAGE_SIZE = 10;

export const useBikesProvider = () => {
  const [bikes, setBikes] = useState<BikeModel[]>([]);
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
      .get<BikesPageModel>("http://localhost:3000/bikes", {
        params: { page: nextPage, limit: nextPageSize },
      })
      .then((result) => {
        const lastPage = Math.max(
          1,
          Math.ceil(result.data.totalCount / nextPageSize),
        );
        // The page no longer exists (e.g. last bike of the last page deleted)
        if (nextPage > lastPage) return load(lastPage, nextPageSize);
        setBikes(result.data.bikes);
        setTotalCount(result.data.totalCount);
        setPage(nextPage);
        setPageSize(nextPageSize);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Returns the request so the caller can react to errors (e.g. 409: bike already sold)
  const deleteBike = (id: string) =>
    axios.delete(`http://localhost:3000/bikes/${id}`).then(() => load());

  const createBike = (input: CreateBikeModel) =>
    axios
      .post<BikeModel>("http://localhost:3000/bikes", input)
      .then(() => load());

  return {
    bikes,
    totalCount,
    page,
    pageSize,
    load,
    isLoading,
    deleteBike,
    createBike,
  };
};
