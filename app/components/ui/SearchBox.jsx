import React from "react";
import styled from "styled-components";

const SearchBox = () => {
  return (
    <SearchBoxStyle>
      <input type="text" placeholder="Search..." />
    </SearchBoxStyle>
  );
};

const SearchBoxStyle = styled.div`
display: flex   ;
width: 190px;
input{
    width: 100%;
    padding: 8px;
    border-radius: 6px;
    border: 1px solid #ddd;
    outline: none;
    font-size: 14px;
    color: #333;
    
    &:focus{
        border: 1px solid #333;
    }
}

`;

export default SearchBox;
