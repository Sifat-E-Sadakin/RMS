"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { PiSquaresFourBold } from "react-icons/pi";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import logo from "../../../public/logo.png";
import Image from "next/image";

const Sidebar = () => {
  const pathName = usePathname();
  const [hideSidebar, setHideSidebar] = useState(
    pathName === "/login" ? true : false
  );

  const sidebarItems = [
    {
      title: "Restaurant Management",
      menuItems: [{ title: "Restaurant List", path: "/restaurant-list" }],
    },
    {
      title: "Employee Management",
      menuItems: [
        { title: "Employee List", path: "/employee-list" },
        { title: "create Employee", path: "/create-employee" },
      ],
    },
    {
      title: "Menu Management",
      menuItems: [
        { title: "Menu List", path: "/menu-list" },
        { title: "Menu Item", path: "/menu-item" },
      ],
    },
  ];

  return (
    <SidebarStyle $hide={false}>
      <div className="sidebar-header">
        <Image src={logo} alt="logo" />
        <h2>Techsist Ltd.</h2>
      </div>
      <div className="sidebar-items">
        {sidebarItems.map((item, index) => (
          <div key={index}>
            <h2>
              <PiSquaresFourBold /> {item.title}
            </h2>
            <ul>
              {item.menuItems.map((menuItem, index) => (
                <li key={index}>
                  <Link href={menuItem.path}>
                    <MdKeyboardDoubleArrowRight /> {menuItem.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SidebarStyle>
  );
};

const SidebarStyle = styled.div`

    background-color: #152b40;
    width: 300px;
    height: 100vh;  
    display: ${props => (props.$hide ? "none" : "block")};

   .sidebar-items{
    padding: 20px;
    h2 {
        color: #ffffff;
        font-size: 16px;
        font-weight: 300;
        padding: 15px 0;
    }
    ul{
        
        li{
            padding: 10px 0 10px 26px;
            margin: 5px 0;
            border-radius: 3px;
            &:hover{
                background-color: #dbdade;
                cursor: pointer;
                
                
                
            }
            &:hover a{
                color: #0b0b0b;
            }
            a{
                color: #ffffff;
                font-size: 16px;
                font-weight: 300;
                text-decoration: none;
                display: flex;
                

            }
        }
    }
   }
    .sidebar-header {
        display: flex;
        gap: 8px;
        align-items: center;
        justify-content: center;
        padding: 24px 0 0px 0;
        img {
        width: 60px;
        height: auto;
        }
        h2 {
        color: #ffffff;
        font-size: 18px;
        font-weight: 600;
        padding: 15px 0;
        }   
    }

`;

export default Sidebar;
