"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BaseUI from "../components/ui/BaseUI";
import BasicBtn from "../components/styles/BasicBtn";
import SearchBox from "../components/ui/SearchBox";
import BasicTable from "../components/ui/BasicTable";
import BasicSelect from "../components/ui/BasicSelect";
import {
  useDeleteEmployeeMutation,
  useGetEmployeeListQuery,
} from "@/store/store";
import BasicModal from "../components/ui/BasicModal";
import DisableBtn from "../components/styles/DisableBtn";
import DangerBtn from "../components/styles/DangerBtn";

const page = () => {
  const [modalName, setModalName] = useState("");
  const [show, setShow] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [employeeId, setEmployeeId] = useState(null);

  const { data: employeeList, refetch } = useGetEmployeeListQuery();
  const {
    data: deleteEmployee,
    mutateAsync: deleteMuteAsync,
    isSuccess: isSuccessDelete,
  } = useDeleteEmployeeMutation(employeeId);

  const openModal = (name, id) => {
    setShow(true);
    setModalName(name);
    setEmployeeId(id);
  };
  const closeModal = () => setShow(false);

  const tableHeader = ["Name", "Salary", "Email", "Action"];

  const onDelete = () => {
    deleteMuteAsync();
  };

  if (isSuccessDelete) {
    refetch();
  }

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
      {modalName === "delete" ? (
        <BasicModal show={show} closeModal={closeModal}>
          <div className="modal-content-wrapper">
            <div className="modal-header">
              <h2>Warning</h2>
              <button onClick={() => closeModal()}>X</button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this restaurant?</p>
              <div className="btn-group">
                <DisableBtn click={() => closeModal()}>Cancel</DisableBtn>
                <DangerBtn click={() => onDelete()}>Delete</DangerBtn>
              </div>
            </div>
          </div>
        </BasicModal>
      ) : null}
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
    .modal-content-wrapper{
        .modal-header{
            display: flex;
            justify-content: space-between;
            h2{
                font-size: 18px;
                font-weight: 600;
                color: #0b0b0b;
            }
            button{
                background-color: #f8f7fa;
                border: none;
                border-radius: 5px;
                padding: 5px 10px;
                cursor: pointer;
            }
        }
        .modal-body{
            margin-top: 20px;
            form{
                .form-group{
                  
                    display: flex;
                    flex-direction: column;

                    label{
                        font-size: 14px;
                        color: #0b0b0b;
                        margin-bottom: 4px;
                    }
                    input{
                        display: flex;
                        
                        height: auto;
                        padding: 10px 14px;
                        border-radius: 4px;
                        
                        font-size: 14px;
                        font-weight: 300;
                        color: #1d1d1b;
                        border: 1px solid #a19c9c;
                    }
                }
                .btn-wrapper{
                    text-align: center;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: calc(100% );
                    margin-top: 20px;
                    button{
                        width: 100%;
                        height: auto;
                        background-color: #2963A2;
                        /* text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); */
                        color: #FFFFFF;
                        font-size: 16px;
                        font-weight: 600;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        transition: 0.3s;
                        &:hover{
                            background-color: #1b4f7f;
                        }
                    }
                }
            }
            p{
                font-size: 14px;
                color: #0b0b0b;

            }
            .btn-group{
                display: flex;
                justify-content: end;
                gap: 16px;
                margin-top: 20px;

        }
    }
}

`;
export default page;
