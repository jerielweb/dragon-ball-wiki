export interface Characters {
    items: Item[];
    meta: Meta;
    links: Links;
    load: undefined;
}
export interface Transformations {
    name: string;
    load: undefined
}
export interface Item {
    id: number;
    name: string;
    ki: string;
    maxKi: string;
    race: string;
    gender: string;
    description: string;
    image: string;
    affiliation: string;
    deletedAt: null;
    transformations: Transformations[];
}

export interface Links {
    first: string;
    previous: string;
    next: string;
    last: string;
}

export interface Meta {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
}
