import React from "react";
import "./Title.css";

interface ITitle{
    text: string;
}

const Title = ({text}:ITitle) => {
    return (
        <h1 className="title">{text}</h1>
    );
};

export default React.memo(Title);