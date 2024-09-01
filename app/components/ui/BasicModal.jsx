import React, { useState } from "react";
import styled from "styled-components";

const BasicModal = props => {
  return (
    <BasicModalStyle $show={props.show}>
      <div className="modal-content">{props.children}</div>
    </BasicModalStyle>
  );
};

const BasicModalStyle = styled.div`
    display: ${props => (props.$show ? "flex" : "none")};
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
    
    
    .modal-content {
        background-color: #fefefe;
        margin: auto;
        padding: 20px;
        border: 1px solid #888;
        width: 745px;
        height: auto;
        border-radius: 6px;
        box-shadow: 0 2px 4px 0 rgba(165, 163, 174, 0.3);
    }
`;

export default BasicModal;
