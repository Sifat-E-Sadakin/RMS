import React from "react";
import styled from "styled-components";

const DisableBtn = props => {
  return <BasicBtnStyle onClick={props.click}>{props.children}</BasicBtnStyle>;
};

const BasicBtnStyle = styled.button`
    background-color: rgba(168, 170, 174, 0.16);
    box-shadow: 0 2px 4px 0 rgba(165, 163, 174, 0.3);
    color: #a8aaae;
    padding: 10px 12px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    transition: 0.3s;
    &:hover{
        background-color: #1b4f7f;
    }
`;

export default DisableBtn;
