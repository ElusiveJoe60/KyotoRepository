import React from "react";
import classes from "./MyMenu.module.css";
import { Link } from "react-router-dom";

const MyMenu = React.forwardRef(() => {
    return (
        <div className={classes.MyMenu}>
            <input type="checkbox" id="burger-checkbox" className={classes.burger_checkbox}/>
            <label htmlFor="burger-checkbox" className={classes.burger}></label>
            <ul className={classes.menu_list}>
                <li>
                    <Link to="/category/beauty" className="product_by_category_link">
                        <a href="#" className={classes.menu_item}>Косметика</a>
                    </Link>
                </li>
                <li>
                    <Link to="/category/fragrances" className="product_by_category_link">
                        <a href="#" className={classes.menu_item}>Духи</a>
                    </Link>
                </li>
                <li>
                    <Link to="/category/furniture" className="product_by_category_link">
                        <a href="#" className={classes.menu_item}>Мебель</a>
                    </Link>
                </li>
                <li>
                    <Link to="/category/groceries" className="product_by_category_link">
                        <a href="#" className={classes.menu_item}>Продукты</a>
                    </Link>
                </li>
            </ul>
        </div>
    )
})

export default MyMenu;