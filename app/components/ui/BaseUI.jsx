import { usePathname } from "next/navigation";
import React from "react";
import styled from "styled-components";

const BaseUI = ({ children }) => {
  const pathName = usePathname();
  return <BaseUIStyle $hide={pathName === "/login"}>{children}</BaseUIStyle>;
};

const BaseUIStyle = styled.div`
 /* width: 100%; */
 box-shadow: 0 2px 4px 0 rgba(165, 163, 174, 0.3);
 background-color: #ffffff;
 border-radius: 6px;
 padding: 24px
   
`;

export default BaseUI;
