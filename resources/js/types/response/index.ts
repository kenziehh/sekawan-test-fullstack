export interface PaginationLink {
    active: boolean;
    label: string;
    url: string;
}
export interface Meta {
    links: PaginationLink[];
}

export interface Response<T> {
    data: T;
    links?: any;
    meta?: Meta;
}
