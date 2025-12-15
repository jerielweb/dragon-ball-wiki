export interface Characters {
    items: Item[];
    meta: Meta;
    links: Links;
    load?: undefined;
}

export interface Transformation {
    id: number;
    name: string;
    image: string;
    ki: string;
    deletedAt: null | string;
}

export interface Item {
    id: number;
    name: string;
    ki?: string;
    maxKi?: string;
    race?: string;
    gender?: string;
    description?: string;
    image: string;
    affiliation?: string;
    deletedAt?: null | string;
    transformations?: Transformation[];
}

export interface PlanetsItem {
    id: number;
    name: string;
    isDestroyed?: boolean;
    description?: string;
    image: string;
    deletedAt?: null | string;
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
