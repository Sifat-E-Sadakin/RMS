"use client";
import React from "react";
import styled from "styled-components";
import BaseUI from "@/app/components/ui/BaseUI";
import BasicSelect from "@/app/components/ui/BasicSelect";
import BasicInput from "@/app/components/ui/BasicInput";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  useAddEmployeeMutation,
  useEditEmployeeMutation,
  useGetRestaurantListQuery,
} from "@/store/store";
import { useParams, useRouter } from "next/navigation";

const schema = yup.object({}).required();

const page = () => {
  const id = useParams().slug;
  const { data: restaurantList } = useGetRestaurantListQuery();
  const {
    data: editEmployeeData,
    mutateAsync: editMuteAsync,
    isSuccess,
  } = useEditEmployeeMutation(id);

  console.log(restaurantList);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = data => {
    const payload = {
      role: "employee",
      ...data,
    };
    editMuteAsync(payload);
    console.log(data);
  };

  if (isSuccess) {
    useRouter().push("/employee-list");
  }
  return (
    <EditEmployeeStyle>
      <BaseUI>
        <div className="section-header">
          <h1>Edit Employee Information</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-fields">
            <div className="form-group">
              <BasicSelect
                label="Select Restaurant"
                options={restaurantList?.data.map(item => {
                  return { label: item.name, value: item.id };
                })}
                register={{ ...register("restaurant") }}
              />
            </div>
            <div className="form-group">
              <BasicInput
                label="First Name"
                type="text"
                register={{ ...register("first_name") }}
              />
            </div>
            <div className="form-group">
              <BasicInput
                label="Last Name"
                type="text"
                register={{ ...register("last_name") }}
              />
            </div>
            <div className="form-group">
              <BasicInput
                label="Email"
                type="email"
                register={{ ...register("email") }}
              />
            </div>
            <div className="form-group">
              <BasicInput
                label="Phone"
                type="number"
                register={{ ...register("phone_number") }}
              />
            </div>
            <div className="form-group">
              <BasicInput
                label="Username"
                type="text"
                register={{ ...register("username") }}
              />
            </div>
            <div className="form-group">
              <BasicInput
                label="Salary"
                type="Number"
                register={{ ...register("salary") }}
              />
            </div>
            <div className="form-group">
              <BasicInput
                label="Date of Birth"
                type="date"
                register={{ ...register("birth_date") }}
              />
            </div>
            <div className="form-group">
              <BasicInput label="Picture" type="file" />
            </div>
            <div className="form-group">
              <BasicInput
                label="Password"
                type="password"
                register={{ ...register("password") }}
              />
            </div>
          </div>
          <div className="btn-box">
            <button type="submit">Save</button>
          </div>
        </form>
      </BaseUI>
    </EditEmployeeStyle>
  );
};

const EditEmployeeStyle = styled.div`
    .section-header {
        h1{
            font-size: 18px;
            font-weight: 600;
            color: #0b0b0b;
            margin-bottom: 42px
        }
    }
    form{
        .form-fields{
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
            .form-group{
          
           }
    
        }
        button{
            padding: 8px 16px;
            background-color: #2963a2;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            width: 100%;
        }
    }       
`;
export default page;
