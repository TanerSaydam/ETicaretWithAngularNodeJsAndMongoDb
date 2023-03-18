export class PaginationResponseModel<T>{
    data: T;
    totalPageCount: number = 0;
    pageNumber: number = 0;
    pageSize: number = 0;
    isFirstPage: boolean = true;
    isLastPage: boolean = false;
}