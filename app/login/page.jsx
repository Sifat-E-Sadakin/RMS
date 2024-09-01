"use client";
import React, { use } from "react";
import styled from "styled-components";
import logo from "../../public/logo.png";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLoginMutation } from "@/store/store";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
const schema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
  })
  .required();
const page = () => {
  const {
    data: loginData,
    mutateAsync,
    isSuccess,
    status,
  } = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = data => {
    mutateAsync(data);
    Cookies.set("username", data.username);
  };

  if (isSuccess) {
    if (loginData.access) {
      Cookies.set("access", loginData.access);
      Cookies.set("refresh", loginData.refresh);
    }
    redirect("/restaurant-list");
  }
  return (
    <LoginStyle>
      <div className="login-box-wrapper">
        <div className="login-box">
          <h1>Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="email">
                Username <span>*</span>
              </label>
              <input
                type="text"
                id="email"
                placeholder="user name"
                {...register("username")}
              />
              <p>{errors.username?.message}</p>
            </div>
            <div className="form-group">
              <label htmlFor="password">
                Password <span>*</span>
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                {...register("password")}
              />
              <p>{errors.password?.message}</p>
            </div>
            <div className="btn-wrapper">
              <button type="submit">Login</button>
            </div>
          </form>
          <div className="login-footer">
            <Image src={logo} alt="logo" />
            <h2>Techsist Ltd.</h2>
          </div>
        </div>
      </div>
    </LoginStyle>
  );
};

const LoginStyle = styled.div`
    background-image: url('/login_bg.png');
    background-size: cover;
    background-position: center;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-box-wrapper{
      width: 592px;
      height: auto;
      backdrop-filter: blur(5px);
      background-color:rgba(244, 242, 247, 0.2);
     
      .login-box{
        padding: 55px 66px ;
        h1{
          text-align: center;
          font-size: 28px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 50px;
        }
        .form-group{
          margin-bottom: 20px;
          label{
            font-size: 16px;
            font-weight: 400;
            color: #191818;
            transform: translateY(30px);
            display: inline-block;
            margin-left: 10px;
            span{
              color: #e56456;
            }
          }
          input{
            width: 100%;
            height: 50px;
            padding:25px 0px 0px 10px;
            border-radius: 5px;
            border: none;
            font-size: 14px;
            font-weight: 300;
            color: #1d1d1b;
          }
        }
        .btn-wrapper{
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
          width: calc(100% + 10px);
          button{
          
          width: 100%;
          height: 50px;
          background-color: #2963A2;
          text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
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

      .login-footer{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
        margin-top: 77px;
        img{
          width: 82px;
          height: 70px;
        }
        h2{
          font-size: 24px;
          font-weight: 600;
          color: #ffffff;
          margin-left: 10px;
          text-shadow: 0px -2px 4px rgba(0, 0, 0, 0.5);
        }
      }
    }
`;

export default page;
