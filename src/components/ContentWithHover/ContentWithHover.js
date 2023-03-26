import React from "react";

const ContentWithHover = ({ value, children}) => {
    return <span title={value}>{!children ? value : children}</span>
}

export  default ContentWithHover;