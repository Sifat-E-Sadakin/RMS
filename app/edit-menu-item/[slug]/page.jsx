"use client";
import React, { use, useEffect, useState } from "react";
import styled from "styled-components";
import BaseUI from "@/app/components/ui/BaseUI";
import BasicSelect from "@/app/components/ui/BasicSelect";
import BasicInput from "@/app/components/ui/BasicInput";
import { Basic } from "next/font/google";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  useAddMenuItemMutation,
  useEditMenuItemMutation,
  useGetMenuListQuery,
} from "@/store/store";
import { useParams } from "next/navigation";

// const schema = yup
//   .object({
//     menu: yup.string(),
//     name: yup.string(),
//     price: yup.number(),
//     image: yup.string(),
//     is_vegetarian: yup.boolean(),
//     is_gluten_free: yup.boolean(),
//     is_available: yup.boolean(),
//     description: yup.string(),
//   })
//   .required();

const page = () => {
  const [menuList, setMenuList] = useState([]);
  const { data: menuListData } = useGetMenuListQuery();
  const id = useParams().slug;
  const { data: EditMenuItemData, mutateAsync } = useEditMenuItemMutation(id);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onCreate = data => {
    mutateAsync(data);
  };
  console.log(menuList);
  useEffect(() => {
    if (menuListData) {
      setMenuList(menuListData);
    }
  }, [menuListData]);
  return (
    <EditMenuItemStyle>
      <BaseUI>
        <div className="section-header">
          <h1>Edit Menu Item</h1>
        </div>
        <form onSubmit={handleSubmit(onCreate)}>
          <div className="upper-form-fields">
            <BasicSelect
              label="Menu"
              options={menuList.map(item => {
                return { value: item.id, label: item.name };
              })}
              register={{ ...register("menu") }}
            />
            <BasicInput
              label="Menu Item"
              type="text"
              register={{ ...register("name") }}
            />
            <BasicInput
              label="Price"
              type="number"
              register={{ ...register("price") }}
            />
          </div>
          <div className="upload-box">
            <BasicInput
              label="Picture"
              type="file"
              // register={{ ...register("image") }}
            />
          </div>
          <div className="checkbox-box">
            <div>
              <BasicInput
                label="Is Vegetarian"
                type="checkbox"
                register={{ ...register("is_vegetarian") }}
              />
              <BasicInput
                label="Is Gluten Free"
                type="checkbox"
                register={{ ...register("is_gluten_free") }}
              />
              <BasicInput
                label="Is Available"
                type="checkbox"
                register={{ ...register("is_available") }}
              />
            </div>
          </div>
          <div className="lower-fields">
            <BasicInput
              label="Description"
              type="text"
              register={{ ...register("description") }}
            />
          </div>
          <div className="btn-box">
            <button className="custom-btn" type="submit">
              Save
            </button>
          </div>
        </form>
      </BaseUI>
    </EditMenuItemStyle>
  );
};

const EditMenuItemStyle = styled.div`
    .section-header {
        margin-bottom: 64px;
        h1{
            font-size: 18px;
            font-weight: 600;
            color: #0b0b0b;
        }
    }
    form{
        .upper-form-fields{
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
        }
        .upload-box{
            display: grid ;
            grid-template-columns: repeat(3, 1fr);
        }
        .checkbox-box{
            display: grid ;
            grid-template-columns: repeat(3 , 1fr);
            div{
                display: flex;
                gap: 4px;
                align-items: center;
            }
        }
        .lower-fields{
            margin-top: 32px;
        }
        .btn-box{
            margin-top: 32px;
            
            .custom-btn{
                background-color: #2963a2;
                color: #ffffff;
                padding: 10px 12px;
                border-radius: 6px;
                border: none;
                cursor: pointer;
                transition: 0.3s;
                width: 100%;
                &:hover{
                    background-color: #1b4f7f;
                }
            }
        }
    }

`;

export default page;
