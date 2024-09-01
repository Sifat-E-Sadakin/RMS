"use client";
import React from "react";
import styled from "styled-components";
import BaseUI from "../components/ui/BaseUI";
import BasicSelect from "../components/ui/BasicSelect";
import BasicInput from "../components/ui/BasicInput";

const page = () => {
  return (
    <EditEmployeeStyle>
      <BaseUI>
        <div className="section-header">
          <h1>Edit Employee Information</h1>
        </div>
        <form action="">
          <div className="form-fields">
            <div className="form-group">
              <BasicSelect
                label="Select Restaurant"
                options={[
                  "KFC",
                  "McDonald",
                  "Pizza Hut",
                  "Burger King",
                  "Domino's Pizza",
                  "Subway",
                ]}
              />
            </div>
            <div className="form-group">
              <BasicInput label="First Name" type="text" />
            </div>
            <div className="form-group">
              <BasicInput label="Last Name" type="text" />
            </div>
            <div className="form-group">
              <BasicInput label="Email" type="email" />
            </div>
            <div className="form-group">
              <BasicInput label="Phone" type="number" />
            </div>
            <div className="form-group">
              <BasicInput label="Username" type="text" />
            </div>
            <div className="form-group">
              <BasicInput label="Salary" type="Number" />
            </div>
            <div className="form-group">
              <BasicInput label="Date of Birth" type="date" />
            </div>
            <div className="form-group">
              <BasicInput label="Picture" type="file" />
            </div>
            <div className="form-group">
              <BasicInput label="Password" type="password" />
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
