export class RequestModel{
    pageNumber: number = 1;
    pageSize: number = 5;
    search: string = "";
    categoryId: string = "";
}// find(p=> p.name.contains(search) || p.description.contains(search))