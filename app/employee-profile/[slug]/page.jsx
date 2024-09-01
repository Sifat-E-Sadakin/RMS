"use client";
import React, { useState } from "react";
import styled from "styled-components";
import BaseUI from "@/app/components/ui/BaseUI";
import DangerBtn from "@/app/components/styles/DangerBtn";
import logo from "@/public/logo.png";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import {
  useDeleteEmployeeMutation,
  useGetEmployeeListQuery,
} from "@/store/store";
import BasicModal from "@/app/components/ui/BasicModal";
import DisableBtn from "@/app/components/styles/DisableBtn";
import Link from "next/link";

const page = () => {
  const id = useParams().slug;
  const [modalName, setModalName] = useState("");
  const [show, setShow] = useState(true);
  const { data: employeeInfo } = useGetEmployeeListQuery(id);
  const {
    data: deleteEmployee,
    mutateAsync: deleteMuteAsync,
    isSuccess: isSuccessDelete,
  } = useDeleteEmployeeMutation(id);
  console.log(employeeInfo);
  const openModal = name => {
    setShow(true);
    setModalName(name);
  };
  const closeModal = () => setShow(false);

  const onDelete = () => {
    deleteMuteAsync();
  };
  if (isSuccessDelete) {
    useRouter().push("/employee-list");
  }
  return (
    <EmployeeProfileStyle>
      <BaseUI>
        <div className="section-header">
          <h1>Employee Profile</h1>
          <div className="btn-group">
            <DangerBtn click={() => openModal("delete")}>Delete</DangerBtn>
            <Link href={`/edit-employee-info/${id}`}>
              {" "}
              <button className="custom-btn">Edit</button>
            </Link>
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
