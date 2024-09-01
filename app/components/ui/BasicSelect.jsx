import React from "react";
import styled from "styled-components";

const BasicSelect = props => {
  return (
    <BasicSelectStyle>
      <label htmlFor="">{props.label}</label>
      <select name="" id="" {...props.register}>
        {props.options?.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </BasicSelectStyle>
  );
};

const BasicSelectStyle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 16px;
    label {
        margin-right: 8px;
        font-size: 14px;
        color: #0b0b0b;
        font-weight: 400;
    }
    select {
        padding: 8px;
        border-radius: 4px;
        border: 1px solid #d1d1d1;
    }

`;

export default BasicSelect;
