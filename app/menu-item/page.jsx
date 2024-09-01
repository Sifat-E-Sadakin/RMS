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
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useGetMenuItemListQuery } from "@/store/store";
import Link from "next/link";

const schema = yup
  .object({
    name: yup.string().required(),
  })
  .required();

const page = () => {
  const [modalName, setModalName] = useState("");
  const [show, setShow] = useState(true);
  const [tableData, setTableData] = useState([]);

  const { data: menuItemList, refetch } = useGetMenuItemListQuery();
  const openModal = name => {
    setShow(true);
    setModalName(name);
    console.log(name);
  };
  const closeModal = () => setShow(false);

  const tableHeader = ["Menu", "Menu Item", "Description", "Action"];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

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
            <BasicTable
              tableHeader={tableHeader}
              tableData={tableData}
              openModal={openModal}
            />
          </div>
        </div>
      </BaseUI>
      {modalName === "create" ? (
        <BasicModal show={show} closeModal={closeModal}>
          <div className="modal-content-wrapper">
            <div className="modal-header">
              <h2>Create Restaurant</h2>
              <button onClick={() => closeModal()}>X</button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <BasicSelect
                    label="Restaurant Name"
                    options={[
                      "KFC",
                      "McDonald",
                      "Pizza Hut",
                      "Burger King",
                      "Domino's Pizza",
                      "Subway",
                    ]}
                  />
                  <BasicInput label="Menu Name" type="text" />
                  <BasicInput label="Description" type="text" />
                </div>

                <div className="btn-wrapper">
                  <BasicBtn>Save</BasicBtn>
                </div>
              </form>
            </div>
          </div>
        </BasicModal>
      ) : modalName === "edit" ? (
        <BasicModal show={show} closeModal={closeModal}>
          <div className="modal-content-wrapper">
            <div className="modal-header">
              <h2>Edit Menu</h2>
              <button onClick={() => closeModal()}>X</button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <BasicSelect
                    label="Restaurant Name"
                    options={[
                      "KFC",
                      "McDonald",
                      "Pizza Hut",
                      "Burger King",
                      "Domino's Pizza",
                      "Subway",
                    ]}
                  />
                  <BasicInput label="Menu Name" type="text" />
                  <BasicInput label="Description" type="text" />
                </div>

                <div className="btn-wrapper">
                  <BasicBtn>Update</BasicBtn>
                </div>
              </form>
            </div>
          </div>
        </BasicModal>
      ) : modalName === "delete" ? (
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
                <DangerBtn>Delete</DangerBtn>
              </div>
            </div>
          </div>
        </BasicModal>
      ) : null}
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
} `;
export default page;
