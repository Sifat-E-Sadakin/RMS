"use client";
import React, { useEffect, useState } from "react";
import StyledJsxRegistry from "./utils/registry";
import GlobalStyle from "./components/styles/GlobalStyles";
import Sidebar from "./components/ui/Sidebar";
import styled from "styled-components";
import { usePathname } from "next/navigation";
import BaseUI from "./components/ui/BaseUI";
import { GoSignOut } from "react-icons/go";
import Breadcrumb from "./components/ui/Breadcrumb";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { get } from "react-hook-form";

const LayoutWrapper = ({ children }) => {
  const queryClient = new QueryClient();
  const [pathName, setPathName] = useState("");
  const path = usePathname();
  useEffect(() => {
    setPathName(path);
  }, [path]);

  console.log(pathName);
  return (
    <LayoutWrapperStyle $hide={pathName === "/login"}>
      <QueryClientProvider client={queryClient}>
        <StyledJsxRegistry>
          <GlobalStyle />
          <div className="sidebar-wrapper">
            <Sidebar />
          </div>
          <section className="panel">
            <div className="header-box-wrapper">
              <BaseUI>
                <div className="header-box">
                  <h1>Restaurant Management System</h1>
                  <div className="sign-out-icon">
                    <GoSignOut />
                  </div>
                </div>
              </BaseUI>
            </div>
            <Breadcrumb />
            {children}
          </section>
        </StyledJsxRegistry>
      </QueryClientProvider>
    </LayoutWrapperStyle>
  );
};

const LayoutWrapperStyle = styled.div`
 position: relative;
  display: flex;
  .sidebar-wrapper {
    display: ${props => (props.$hide ? "none" : "block")};
  }
  
  .panel {
    background-color: #f8f7fa;
    width: 100%;
    padding: ${props => (props.$hide ? "0" : "0 26px")};
    
    overflow-x: hidden;
    height: 100vh;
    overflow-y : scroll;
    .header-box-wrapper{
      display: ${props => (props.$hide ? "none" : "block")};
      padding-top: 16px;
      .header-box {
      display: flex;
      justify-content: space-between;
      
      
      h1 {
        font-size: 18px;
        font-weight: 600;
        color: #0b0b0b;
      }
      .sign-out-icon {
        font-size: 20px;
        color: #0b0b0b;
        cursor: pointer;
        font-weight: 600;
      }
    }
    }
  }

`;

export default LayoutWrapper;
