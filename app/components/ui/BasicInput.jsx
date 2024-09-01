import React from "react";
import styled from "styled-components";

const BasicInput = props => {
  return (
    <BasicInputStyle $checkbox={props.type === "checkbox"}>
      <label htmlFor="phone">{props.label}</label>
      <input type={props.type} {...props.register} />
    </BasicInputStyle>
  );
};

const BasicInputStyle = styled.div`
    display: flex;
    flex-direction: ${props => (props.$checkbox ? "row-reverse" : "column")};
    gap: 4px;
    margin-bottom: 16px;
    label {
        margin-right: 8px;
        font-size: 14px;
        color: #0b0b0b;
        font-weight: 400;
    }
    input {
        padding: 8px;
        border-radius: 4px;
        border: 1px solid #d1d1d1;
        font-size: 14px;
        font-weight: 300;
        color: #57545c;

        
    }
    input[type="checkbox"]{
        width: 16px;
        height: 16px;
    }
`;

export default BasicInput;
