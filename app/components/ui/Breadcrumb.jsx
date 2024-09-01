import { usePathname } from "next/navigation";
import React from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import styled from "styled-components";

const Breadcrumb = () => {
  const pathname = usePathname();
  console.log(pathname);
  const bread = pathname.split("/").filter(item => item !== "");
  const upperCase = bread.map(
    item => item.charAt(0).toUpperCase() + item.slice(1)
  );
  const finalBread = upperCase.map(item => item.replace("-", " "));

  return (
    <BreadcrumbStyle $hide={pathname === "/login"}>
      <nav aria-label="breadcrumb">
        <ul className="breadcrumb">
          <li>
            RMS <MdOutlineKeyboardArrowRight />
          </li>
          {finalBread.map((item, index) => (
            <li className="breadcrumb-item" key={index}>
              {item}
            </li>
          ))}
        </ul>
      </nav>
    </BreadcrumbStyle>
  );
};

const BreadcrumbStyle = styled.div`
padding: ${props => (props.$hide ? "0" : "24px")};
    .breadcrumb {
        display: ${props => (props.$hide ? "none" : "flex")};
        list-style: none;
        padding: 0;
        margin: 0;
        li {
        display: flex;
        align-items: center;
        font-size: 16px;
        color: #0b0b0b;
        font-weight: 400;
        svg {
            font-size: 20px;
            color: #0b0b0b;
            transform: translateY(-.5px);
            margin-left: 8px;
        }
        }
        .breadcrumb-item {
        margin-left: 8px;
        }
    }
`;

export default Breadcrumb;
