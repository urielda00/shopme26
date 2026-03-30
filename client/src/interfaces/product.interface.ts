import React from 'react';

// Product Entity
export interface IProduct {
    _id: string;
    productName: string;
    price: number;
    category: string;
    brand: string;
    os: string;
    quantity: number;
    releaseYear: number;
    shortDescription?: string;
    longDescription?: string;
    images: string[];
}

// Props for GenerateLinks (The missing piece)
export interface IGenerateLinksProps {
    src?: string;
    icon: boolean;
    width?: string;
    button: boolean;
    height?: string;
    content?: string;
    marginTop?: string;
    marginBottom?: string;
}

// Props for Home & Carousel
export interface ICarouselItem {
    h1: string;
    src: string;
}

export interface ICarouselItemProps {
    width: string;
    isSmall?: boolean;
    item: ICarouselItem;
}

// Props for ProductList Filters
export interface ICategoriesProps {
    os: boolean;
    text: string;
    year: boolean;
    brand: boolean;
    isPanel: string;
    category: boolean;
}

export interface IFilterProps {
    isMedium: boolean;
    pStyle: React.CSSProperties;
}