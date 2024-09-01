"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BaseUI from "../components/ui/BaseUI";
import BasicBtn from "../components/styles/BasicBtn";
import SearchBox from "../components/ui/SearchBox";
import BasicTable from "../components/ui/BasicTable";
import BasicSelect from "../components/ui/BasicSelect";
import { useGetEmployeeListQuery } from "@/store/store";

const page = () => {
  const [modalName, setModalName] = useState("");
  const [show, setShow] = useState(true);
  const [tableData, setTableData] = useState([]);

  const { data: employeeList, refetch } = useGetEmployeeListQuery();
  const openModal = name => {
    setShow(true);
    setModalName(name);
    console.log(name);
  };
  const closeModal = () => setShow(false);

  const tableHeader = ["Name", "Salary", "Email", "Action"];

  useEffect(() => {
    if (employeeList) {
      const data = employeeList.data.map(item => {
        return [
          item.id,
          item.user.full_name,
          item.salary,
          item.user.email,
          "actionView",
        ];
      });
      setTableData(data);
    }
  }, [employeeList]);
  console.log(employeeList);
  return (
    <EmployeeListPageStyle>
      <BaseUI>
        <div className="section-wrapper">
          <h1>Employee List</h1>
          <div className="selection-box">
            <BasicSelect
              label="Select Restaurant"
              options={[
                "KFC",
                "McDonald",
                "Pizza Hut",
                "Burger King",
                "Domino's Pizza",
                "Subway",
              ]}
            />
          </div>
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
              <SearchBox />
            </div>
          </div>
          <div className="table-section">
            <BasicTable
              tableHeader={tableHeader}
              tableData={tableData}
              openModal={openModal}
            />
          </div>
        </div>
      </BaseUI>
    </EmployeeListPageStyle>
  );
};

const EmployeeListPageStyle = styled.div`
     .section-wrapper{
        h1{
            font-size: 18px;
            font-weight: 600;
            color: #0b0b0b;
        }
        .selection-box{
            margin: 32px 0;
            width: 348px;
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
