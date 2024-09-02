"use client";
import React, { use, useEffect, useState } from "react";
import styled from "styled-components";
import BaseUI from "../components/ui/BaseUI";
import BasicSelect from "../components/ui/BasicSelect";
import BasicInput from "../components/ui/BasicInput";
import { Basic } from "next/font/google";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAddMenuItemMutation, useGetMenuListQuery } from "@/store/store";

const schema = yup
  .object({
    menu: yup.string().required(),
    name: yup.string().required(),
    price: yup.number().required(),
    is_vegetarian: yup.boolean().required(),
    is_gluten_free: yup.boolean().required(),
    is_available: yup.boolean().required(),
    description: yup.string().required(),
  })
  .required();

const page = () => {
  const [menuList, setMenuList] = useState([]);
  const { data: menuListData } = useGetMenuListQuery();
  const { data: addMenuItemData, mutateAsync } = useAddMenuItemMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onCreate = data => {
    mutateAsync(data);
  };

  useEffect(() => {
    if (menuListData) {
      setMenuList(menuListData);
    }
  }, [menuListData]);

  return (
    <AddMenuItemStyle>
      <BaseUI>
        <div className="section-header">
          <h1>Add Menu Item</h1>
        </div>
        <form onSubmit={handleSubmit(onCreate)}>
          <div className="upper-form-fields">
            <div>
              <BasicSelect
                label="Menu"
                options={menuList.map(item => {
                  return { value: item.id, label: item.name };
                })}
                register={{ ...register("menu") }}
              />
              <p>{errors.menu?.message}</p>
            </div>
            <div>
              <BasicInput
                label="Menu Item"
                type="text"
                register={{ ...register("name") }}
              />
              <p>{errors.name?.message}</p>
            </div>

            <div>
              <BasicInput
                label="Price"
                type="number"
                register={{ ...register("price") }}
              />
              <p>{errors.price?.message}</p>
            </div>
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
              <p>{errors.is_vegetarian?.message}</p>
              <BasicInput
                label="Is Gluten Free"
                type="checkbox"
                register={{ ...register("is_gluten_free") }}
              />
              <p>{errors.is_gluten_free?.message}</p>
              <BasicInput
                label="Is Available"
                type="checkbox"
                register={{ ...register("is_available") }}
              />
              <p>{errors.is_available?.message}</p>
            </div>
          </div>
          <div className="lower-fields">
            <BasicInput
              label="Description"
              type="text"
              register={{ ...register("description") }}
            />
            <p>{errors.description?.message}</p>
          </div>
          <div className="btn-box">
            <button className="custom-btn" type="submit">
              Save
            </button>
          </div>
        </form>
      </BaseUI>
    </AddMenuItemStyle>
  );
};

const AddMenuItemStyle = styled.div`
    .section-header {
        margin-bottom: 64px;
        h1{
            font-size: 18px;
            font-weight: 600;
            color: #0b0b0b;
        }
    }
    form{
        p{
            color: red;
            font-size: 12px;
        }
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
