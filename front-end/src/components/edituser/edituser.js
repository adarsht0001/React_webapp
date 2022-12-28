import React, { useEffect } from 'react'
import Button from "react-bootstrap/Button";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import axios from "../../axios/axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux';
function Edituser() {
    const navigate = useNavigate()
    const {register,handleSubmit,formState: { errors },setValue} = useForm()
    const submitForm = (data) => {
      axios.post("/edituser", data).then(() => {
       
      });
    };
    const admin=useSelector((state)=>state.admin.value)
  return (
    <form onSubmit={handleSubmit(submitForm)}>
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <MDBCard
            className="bg-dark text-white my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "400px" }}
          >
            <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
              <h2 className="fw-bold mb-2 text-uppercase">Edit User</h2>
              {errors.name && <p>Fisrtname {errors.name.type}</p>}
              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-white"
                label="Name"
                id="formControlLg"
                type="text"
                defaultValue={admin.edit.name}
                size="lg"
                {...register("name", { required: true, minLength: 4 })}
              />
              {errors.email && <p>email {errors.email.type}</p>}
              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-white"
                label="Email address"
                id="formControlLg"
                type="email"
                defaultValue={admin.edit.email}
                size="lg"
                {...register("email", {
                  required: true,
                  pattern:
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                })}
              />
              <Button
                variant="primary"
                type="submit"
              >
              Edit
              </Button>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  </form>
  )
}

export default Edituser