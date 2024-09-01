"use client";
import React from "react";
import styled from "styled-components";
import BaseUI from "@/app/components/ui/BaseUI";
import DangerBtn from "@/app/components/styles/DangerBtn";
import logo from "@/public/logo.png";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useGetEmployeeListQuery } from "@/store/store";

const page = () => {
  const id = useParams().slug;
  const { data: employeeInfo } = useGetEmployeeListQuery(id);
  console.log(employeeInfo);
  return (
    <EmployeeProfileStyle>
      <BaseUI>
        <div className="section-header">
          <h1>Employee Profile</h1>
          <div className="btn-group">
            <DangerBtn>Delete</DangerBtn>
            <button className="custom-btn">Edit</button>
          </div>
        </div>
        <div className="info-wrapper">
          <h1>
            Restaurant Name : <span>{employeeInfo?.restaurant}</span>
          </h1>
          <div className="info-box">
            <div className="img-box">
              <Image src={employeeInfo?.img} alt="" />
            </div>
            <div className="info">
              <h2>
                Name : <span>{employeeInfo?.user.full_name}</span>
              </h2>
              <h2>
                Phone :{" "}
                <span>
                  {employeeInfo?.phone ? employeeInfo.phone : "Not Available"}
                </span>
              </h2>
              <h2>
                Email : <span>{employeeInfo?.user.email}</span>
              </h2>
              <h2>
                Salary : <span>{employeeInfo?.salary}</span>
              </h2>
              <h2>
                Date of Birth :{" "}
                <span>
                  {employeeInfo?.user.birth_date
                    ? employeeInfo?.user.birth_date
                    : "Not Available"}
                </span>
              </h2>
              <h2>
                Username : <span>{employeeInfo?.user.username}</span>
              </h2>
            </div>
          </div>
        </div>
      </BaseUI>
    </EmployeeProfileStyle>
  );
};

const EmployeeProfileStyle = styled.div`
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
            width: auto;
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
