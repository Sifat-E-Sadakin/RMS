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

const schema = yup
  .object({
    restaurant: yup.string().required(),
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    email: yup.string().required(),
    phone_number: yup.string().required(),
    username: yup.string().required(),
    salary: yup.string().required(),
    birth_date: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

const page = () => {
  const id = useParams().slug;
  const { data: restaurantList } = useGetRestaurantListQuery();
  const {
    data: editEmployeeData,
    mutateAsync: editMuteAsync,
    isSuccess,
  } = useEditEmployeeMutation(id);

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
              <p>{errors.restaurant?.message}</p>
            </div>
            <div className="form-group">
              <BasicInput
                label="First Name"
                type="text"
                register={{ ...register("first_name") }}
              />
              <p>{errors.first_name?.message}</p>
            </div>
            <div className="form-group">
              <BasicInput
                label="Last Name"
                type="text"
                register={{ ...register("last_name") }}
              />
              <p>{errors.last_name?.message}</p>
            </div>
            <div className="form-group">
              <BasicInput
                label="Email"
                type="email"
                register={{ ...register("email") }}
              />
              <p>{errors.email?.message}</p>
            </div>
            <div className="form-group">
              <BasicInput
                label="Phone"
                type="number"
                register={{ ...register("phone_number") }}
              />
              <p>{errors.phone_number?.message}</p>
            </div>
            <div className="form-group">
              <BasicInput
                label="Username"
                type="text"
                register={{ ...register("username") }}
              />
              <p>{errors.username?.message}</p>
            </div>
            <div className="form-group">
              <BasicInput
                label="Salary"
                type="Number"
                register={{ ...register("salary") }}
              />
              <p>{errors.salary?.message}</p>
            </div>
            <div className="form-group">
              <BasicInput
                label="Date of Birth"
                type="date"
                register={{ ...register("birth_date") }}
              />
              <p>{errors.birth_date?.message}</p>
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
              <p>{errors.password?.message}</p>
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
      p{
        color: red;
        font-size: 12px;
      }
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
