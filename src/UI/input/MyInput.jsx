import React from "react";
import classes from "./MyInput.module.css"

const MyInput = ({required = false, placeholder, type = "text", ...props}) => {
    return (
        <input
            className={classes.myInput}
            {...props}
            type={type}
            placeholder={placeholder}
            required={required}
        />
    );
};

export default MyInput;