import { useMemo } from "react";

export const useSortedProducts = (products, sort) => {
    const sortedProducts = useMemo(() => {
        if (sort === "priceAsc") {
            return [...products].sort((a, b) => a.discountedPrice - b.discountedPrice);
        }
        if (sort === "priceDesc") {
            return [...products].sort((a, b) => b.discountedPrice - a.discountedPrice);
        }
        if (sort === "ratingAsc") {
            return [...products].sort((a, b) => a.rating - b.rating);
        }
        if (sort === "ratingDesc") {
            return [...products].sort((a, b) => b.rating - a.rating)
        }
        return products;
    }, [sort, products]);

    return sortedProducts;
};

export const useProducts = (products, query, sort) => {
    const sortedProducts = useSortedProducts(products, sort);
    const searchedAndSortedProducts = useMemo(() => {
        return sortedProducts.filter(product => 
            product.title.toLowerCase().includes(query.toLowerCase())
        );
    }, [query, sortedProducts]);

    return searchedAndSortedProducts;
};
