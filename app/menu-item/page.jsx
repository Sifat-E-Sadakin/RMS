"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BaseUI from "../components/ui/BaseUI";
import BasicBtn from "../components/styles/BasicBtn";
import SearchBox from "../components/ui/SearchBox";
import { FaPlus } from "react-icons/fa6";
import BasicTable from "../components/ui/BasicTable";
import BasicModal from "../components/ui/BasicModal";
import DangerBtn from "../components/styles/DangerBtn";
import DisableBtn from "../components/styles/DisableBtn";
import BasicSelect from "../components/ui/BasicSelect";
import BasicInput from "../components/ui/BasicInput";
import { useGetMenuItemListQuery } from "@/store/store";
import Link from "next/link";

const page = () => {
  const [modalName, setModalName] = useState("");
  const [show, setShow] = useState(true);
  const [tableData, setTableData] = useState([]);

  const { data: menuItemList, refetch } = useGetMenuItemListQuery();

  const tableHeader = ["Menu", "Menu Item", "Description", "Action"];

  useEffect(() => {
    if (menuItemList) {
      const data = menuItemList.map(item => {
        return [item.id, item.menu, item.name, item.description, "view"];
      });
      setTableData(data);
    }
  }, [menuItemList]);

  return (
    <MenuItemStyle>
      <BaseUI>
        <div className="section-wrapper">
          <h1>Menu Item</h1>
          <div className="section-controller">
            <div className="left-controller">
              <div className="data-range-box">
                <label htmlFor="">Show</label>
                <select name="" id="">
                  <option value="">10</option>
                  <option value="">20</option>
                  <option value="">30</option>
                </select>
              </div>
            </div>
            <div className="right-controller">
              <Link href={"/add-menu-item"}>
                <BasicBtn>
                  <FaPlus /> Add Menu Item
                </BasicBtn>
              </Link>
              <SearchBox />
            </div>
          </div>
          <div className="table-section">
            <BasicTable tableHeader={tableHeader} tableData={tableData} />
          </div>
        </div>
      </BaseUI>
    </MenuItemStyle>
  );
};

const MenuItemStyle = styled.div`
 .section-wrapper{
        h1{
            font-size: 18px;
            font-weight: 600;
            color: #0b0b0b;
        }
        .section-controller{
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
            .left-controller{
                display: flex;
                align-items: center;
                .data-range-box{
                    margin-right: 20px;
                    label{
                        font-size: 14px;
                        color: #0b0b0b;
                        margin-right: 10px;
                    }
                    select{
                        padding: 10px;
                        border-radius: 5px;
                        border: 1px solid #ddd;
                        outline: none;
                        font-size: 14px;
                        color: #333;
                    }
                }
            }
            .right-controller{
                display: flex;
                align-items: center;
                gap: 16px;
                button{
                    display: flex;
                    gap: 6px;
                    align-items: center;    
                  
                    
                }
            }
        }

    }
  
 `;
export default page;
