"use client";
import React, { use, useEffect, useState } from "react";
import styled from "styled-components";
import BaseUI from "../components/ui/BaseUI";
import BasicBtn from "../components/styles/BasicBtn";
import SearchBox from "../components/ui/SearchBox";
import { FaPlus } from "react-icons/fa6";
import BasicTable from "../components/ui/BasicTable";
import BasicModal from "../components/ui/BasicModal";
import DangerBtn from "../components/styles/DangerBtn";
import DisableBtn from "../components/styles/DisableBtn";
import {
  useAddRestaurantMutation,
  useDeleteRestaurantMutation,
  useEditRestaurantMutation,
  useGetOwnerListQuery,
  useGetRestaurantListQuery,
} from "@/store/store";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { username } from "@/store/queryHooks";
import BasicSelect from "../components/ui/BasicSelect";

const schema = yup
  .object({
    name: yup.string().required(),
  })
  .required();

const page = () => {
  const [restaurantId, setRestaurantId] = useState("");
  const [tableData, setTableData] = useState([]);
  const [modalName, setModalName] = useState("");
  const [show, setShow] = useState(true);

  const openModal = (name, id) => {
    setShow(true);
    setModalName(name);
    if (id) {
      setRestaurantId(id);
    }
  };
  const closeModal = () => setShow(false);

  const tableHeader = ["Restaurant Name", "Action"];

  const {
    data: restaurantList,
    error,
    isPending,
    refetch,
  } = useGetRestaurantListQuery();
  const { data: ownerList } = useGetOwnerListQuery();
  const {
    data: addData,
    mutateAsync: addMuteAsync,
    isSuccess: isSuccessPost,
  } = useAddRestaurantMutation();
  const {
    data,
    mutateAsync: editMuteAsync,
    isSuccess: isSuccessEdit,
  } = useEditRestaurantMutation(restaurantId);
  const {
    data: deletedRestaurant,
    mutateAsync: deleteMuteAsync,
    isSuccess: isSuccessDelete,
  } = useDeleteRestaurantMutation(restaurantId);
  console.log(restaurantList?.data);
  console.log(ownerList?.data);
  console.log(data);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = data => {
    const payload = {
      is_active: true,

      ...data,
    };
    addMuteAsync(payload);
    closeModal();
  };
  const onEdit = data => {
    const payload = {
      is_active: true,
      ...data,
    };
    editMuteAsync(payload);
    closeModal();
  };
  const onDelete = () => {
    deleteMuteAsync();
    closeModal();
  };
  if (isSuccessPost) {
    refetch();
  }
  if (isSuccessEdit) {
    refetch();
  }
  if (isSuccessDelete) {
    refetch();
  }

  useEffect(() => {
    if (restaurantList) {
      const customTableData = restaurantList.data.map(item => {
        return [item.id, item.name, "action"];
      });
      setTableData(customTableData);
    }
  }, [restaurantList]);

  return (
    <RestaurantListPageStyle>
      <BaseUI>
        <div className="section-wrapper">
          <h1>Restaurant List</h1>
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
                <FaPlus /> Add Restaurant
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
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label htmlFor="restaurant-name">Restaurant Name</label>
                  <input
                    type="text"
                    id="restaurant-name"
                    placeholder="Name"
                    {...register("name")}
                  />
                  <BasicSelect
                    label="Select Owner"
                    options={ownerList?.data.map(item => {
                      return { value: item.id, label: item.full_name };
                    })}
                    register={{ ...register("owner") }}
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
              <h2>Restaurant Edit</h2>
              <button onClick={() => closeModal()}>X</button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit(onEdit)}>
                <div className="form-group">
                  <label htmlFor="restaurant-name">Restaurant Name</label>
                  <input
                    type="text"
                    id="restaurant-name"
                    placeholder="Name"
                    {...register("name")}
                  />
                  <BasicSelect
                    label="Select Owner"
                    options={ownerList?.data.map(item => {
                      return { value: item.id, label: item.full_name };
                    })}
                    register={{ ...register("owner") }}
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
    </RestaurantListPageStyle>
  );
};

const RestaurantListPageStyle = styled.div`

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
                    gap: 20px;
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
