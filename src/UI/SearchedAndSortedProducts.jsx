import React from "react";
import MyInput from "./input/MyInput";
import MySelect from "./select/MySelect";

const SearchedAndSortedProducts = ({filter, setFilter, ...props}) => {
    return (
        <div className="searched_and_sorted_container">
            <MyInput
                placeholder={"Введите название продукта"}
                {...props}
                value={filter.query}
                onChange={event => setFilter({...filter, query: event.target.value})}
            />
            <MySelect
                value={filter.sort}
                onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
                defaultValue="Сортировка по: "
                options={[
                    {value: "noSort", name: "Без сортировки"},
                    {value: "priceAsc", name: "По цене(возрастание)"},
                    {value: "priceDesc", name: "По цене(убывание)"},
                    {value: "ratingAsc", name: "По рейтингу(возрастание)"},
                    {value: "ratingDesc", name: "По рейтингу(убывание"}
                ]}
            >
            </MySelect>
        </div>
    )
}

export default SearchedAndSortedProducts;
