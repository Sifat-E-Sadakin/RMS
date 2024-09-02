"use client";
import React, { use, useEffect, useState } from "react";
import styled from "styled-components";
import logo from "@/public/logo.png";
import BaseUI from "@/app/components/ui/BaseUI";
import DangerBtn from "@/app/components/styles/DangerBtn";
import Image from "next/image";
import {
  useDeleteMenuItemMutation,
  useGetMenuItemDetailsQuery,
} from "@/store/store";
import { useParams } from "next/navigation";
import Link from "next/link";

const page = () => {
  const [itemInfo, setItemInfo] = useState({});
  const [itemId, setItemId] = useState("");
  const id = useParams().slug;

  const { data, refetch } = useGetMenuItemDetailsQuery(id);
  const {
    data: deleteItemData,
    mutateAsync: deleteMuteAsync,
    isSuccess: isSuccessDelete,
  } = useDeleteMenuItemMutation(itemId);

  const onDelete = () => {
    deleteMuteAsync();
  };

  if (isSuccessDelete) {
    refetch();
  }

  useEffect(() => {
    if (data) {
      setItemInfo(data);
      setItemId(data.id);
    }
  }, [data]);

  return (
    <MenuItemDetailsStyle>
      <BaseUI>
        <div className="section-header">
          <h1>Menu Item</h1>
          <div className="btn-group">
            <DangerBtn click={() => onDelete()}>Delete</DangerBtn>
            <Link href={`/edit-menu-item/${id}`}>
              {" "}
              <button className="custom-btn">Edit</button>
            </Link>
          </div>
        </div>
        <div className="info-wrapper">
          <div className="info-box">
            <div className="img-box">
              <Image src={itemInfo.img} alt="" />
            </div>
            <div className="info">
              <h2>
                Menu : <span>{itemInfo.menu}</span>
              </h2>
              <h2>
                Menu Item : <span>{itemInfo.name}</span>
              </h2>
              <h2>
                Price : <span>{itemInfo.price}</span>
              </h2>
              <h2>
                Is Vegetarian :{" "}
                <span>{itemInfo.is_vegetarian === true ? "Yes" : "NO"}</span>
              </h2>
              <h2>
                Is Gluten Free :{" "}
                <span>{itemInfo.is_gluten_free === true ? "Yes" : "NO"}</span>
              </h2>
              <h2>
                Is Available :{" "}
                <span>{itemInfo.is_available === true ? "Yes" : "NO"}</span>
              </h2>
              <h2>
                Description : <span>{itemInfo.description}</span>
              </h2>
            </div>
          </div>
        </div>
      </BaseUI>
    </MenuItemDetailsStyle>
  );
};

const MenuItemDetailsStyle = styled.div`
  .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
        h1 {
            font-size: 18px;
            font-weight: 600;
            color: #0b0b0b;
        }
        .btn-group {
        display: flex;
        gap: 14px;
        .custom-btn{
            background-color: #1b4f7f;
            color: #ffffff;
            padding: 10px 12px;
            border-radius: 6px;
            border: none;
            cursor: pointer;
            transition: 0.3s;
            &:hover{
            background-color: #da4a2f;
            }
        }
        }
    }
    .info-wrapper {
        h1 {
        font-size: 18px;
        font-weight: 600;
        color: #0b0b0b;
        margin-bottom: 32px;
        span{
            font-weight: 500;
        }
        }
        .info-box {
        display: flex;
        gap: 20px;
        .img-box {
            width: 84px ;
            height: 84px;
            img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 6px;
            }
        }
        .info {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            width: 100%;
            h2 {
            font-size: 16px;
            font-weight: 600;
            color: #0b0b0b;
            margin-bottom: 10px;
            span{
                font-weight: 400;
            }
        }
        }
    }
}
`;

export default page;
