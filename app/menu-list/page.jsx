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
import {
  useAddMenuMutation,
  useDeleteMenuMutation,
  useEditMenuMutation,
  useGetMenuListQuery,
  useGetRestaurantListQuery,
} from "@/store/store";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    name: yup.string().required(),
  })
  .required();

const page = () => {
  const [modalName, setModalName] = useState("");
  const [tableData, setTableData] = useState([]);
  const [restaurantList, setRestaurantList] = useState([]);
  const [restaurantId, setRestaurantId] = useState("");
  const [show, setShow] = useState(true);

  const { data: menuList, refetch } = useGetMenuListQuery();
  const { data: restaurantListData } = useGetRestaurantListQuery();
  const {
    data: cratedMenuData,
    mutateAsync: createdMuteAsync,
    isSuccess: isSuccessCreateMenu,
  } = useAddMenuMutation();
  const {
    data: editMenuData,
    mutateAsync: editMuteAsync,
    isSuccess: isSuccessEditMenu,
  } = useEditMenuMutation(restaurantId);
  const {
    data: deleteMenuData,
    mutateAsync: deleteMutedAsync,
    isSuccess: isSuccessDelete,
  } = useDeleteMenuMutation(restaurantId);
  const openModal = (name, id) => {
    setShow(true);
    setModalName(name);
    setRestaurantId(id);
  };
  const closeModal = () => setShow(false);

  const tableHeader = ["Restaurant Name", "Menu Name", "Description", "Action"];
  // const tableData = [
  //   ["KFC", "Chicken Bucket", "Chicken Bucket", "action"],
  //   ["McDonald", "Big Mac", "Big Mac", "action"],
  //   ["Pizza Hut", "Pepperoni Pizza", "Pepperoni Pizza", "action"],
  //   ["Burger King", "Whopper", "Whopper", "action"],
  //   ["Domino's Pizza", "Pepperoni Pizza", "Pepperoni Pizza", "action"],
  //   ["Subway", "Subway Melt", "Subway Melt", "action"],
  // ];

  console.log(menuList);
  console.log(restaurantList);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onCreate = data => {
    const payload = {
      is_active: true,
      ...data,
    };
    createdMuteAsync(payload);
  };

  const onEdit = data => {
    const payload = {
      is_active: true,
      ...data,
    };
    editMuteAsync(payload);
  };

  const onDelete = () => {
    deleteMutedAsync();
  };

  if (isSuccessEditMenu) {
    refetch();
  }

  if (isSuccessCreateMenu) {
    refetch();
  }

  if (isSuccessDelete) {
    refetch();
  }

  useEffect(() => {
    if (menuList) {
      const data = menuList.map(item => {
        return [
          item.id,
          item.restaurant,
          item.name,
          item.description,
          "action",
        ];
      });
      setTableData(data);
    }
  }, [menuList]);

  useEffect(() => {
    if (restaurantListData) {
      setRestaurantList(restaurantListData.data);
    }
  }, [restaurantListData]);
  return (
    <MenuListStyle>
      <BaseUI>
        <div className="section-wrapper">
          <h1>Menu List</h1>
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
              <BasicBtn click={() => openModal("create")}>
                <FaPlus /> Add Menu
              </BasicBtn>
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
              <form onSubmit={handleSubmit(onCreate)}>
                <div className="form-group">
                  <BasicSelect
                    label="Select Restaurant"
                    options={restaurantList.map(item => {
                      return { value: item.id, label: item.name };
                    })}
                    register={{ ...register("restaurant") }}
                  />
                  <BasicInput
                    label="Menu Name"
                    type="text"
                    register={{ ...register("name") }}
                  />
                  <BasicInput
                    label="Description"
                    type="text"
                    register={{ ...register("description") }}
                  />
                </div>

                <div className="btn-wrapper">
                  <BasicBtn type="submit">Save</BasicBtn>
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
              <form onSubmit={handleSubmit(onEdit)}>
                <div className="form-group">
                  <BasicSelect
                    label="Select Restaurant"
                    options={restaurantList.map(item => {
                      return { value: item.id, label: item.name };
                    })}
                    register={{ ...register("restaurant") }}
                  />
                  <BasicInput
                    label="Menu Name"
                    type="text"
                    register={{ ...register("name") }}
                  />
                  <BasicInput
                    label="Description"
                    type="text"
                    register={{ ...register("description") }}
                  />
                </div>

                <div className="btn-wrapper">
                  <BasicBtn type="submit">Update</BasicBtn>
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
                <DangerBtn click={() => onDelete()}>Delete</DangerBtn>
              </div>
            </div>
          </div>
        </BasicModal>
      ) : null}
    </MenuListStyle>
  );
};

const MenuListStyle = styled.div`
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
}
`;
export default page;
