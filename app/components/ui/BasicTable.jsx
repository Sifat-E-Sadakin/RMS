import React from "react";
import styled from "styled-components";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaEye } from "react-icons/fa6";
import Link from "next/link";

const BasicTable = props => {
  return (
    <BasicTableStyle>
      <table>
        <thead>
          <tr>
            {props.tableHeader.map((item, index) => (
              <th key={index}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.tableData.map((item, idx) => (
            <TrStyle key={idx} $idx={idx}>
              {item.map((data, index) => (
                <React.Fragment key={index}>
                  {index !== 0 && (
                    <td key={index}>
                      {data === "action" ? (
                        <>
                          <FiEdit
                            onClick={() => props.openModal("edit", item[0])}
                          />
                          <RiDeleteBinLine
                            onClick={() => props.openModal("delete", item[0])}
                          />
                        </>
                      ) : data === "view" ? (
                        <Link href={`/menu-item-details/${item[0]}`}>
                          <FaEye />
                        </Link>
                      ) : data === "actionView" ? (
                        <>
                          <Link href={`/employee-profile/${item[0]}`}>
                            <FaEye />
                          </Link>
                          <RiDeleteBinLine
                            onClick={() => props.openModal("delete", item[0])}
                          />
                        </>
                      ) : (
                        data
                      )}
                    </td>
                  )}
                </React.Fragment>
              ))}
            </TrStyle>
          ))}
        </tbody>
      </table>
    </BasicTableStyle>
  );
};

const BasicTableStyle = styled.div`
    table {
        width: 100%;
        margin: 24px 0;
        border-collapse: collapse;
        thead{
            
                tr{
                border: 1px solid #a19c9c;
              
                    th {
                    text-align: left;
                    padding: 16px 0;
                    font-size: 16px;
                    color: #0b0b0b;
                    font-weight: 600;
                    border: 1px solid #a19c9c;
                    text-align: center;
                  
            
             }
          }
        }
        /* tbody{
            tr{
                border: 1px solid #a19c9c;
                td {
                    padding: 18px 0;
                    font-size: 14px;
                    color: #0b0b0b;
                    font-weight: 400;
                    border: 1px solid #a19c9c;
                    text-align: center;
                }
            }
        } */

    }
`;

const TrStyle = styled.tr`
    border: 1px solid #a19c9c;
    td {
        padding: 18px 0;
        font-size: 14px;
        color: #0b0b0b;
        font-weight: 400;
        border: 1px solid #a19c9c;
        text-align: center;
        background-color: ${props =>
          props.$idx % 2 === 0 ? "#f7f7fa" : "#ffffff"};
        svg{
            font-size: 18px;
            color: #0b0b0b;
            margin: 0 8px;
            cursor: pointer;
        }
    }

`;

export default BasicTable;
