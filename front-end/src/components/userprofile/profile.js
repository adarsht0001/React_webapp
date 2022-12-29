import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,MDBCardImage} from "mdb-react-ui-kit"
  
import axios from "../../axios/axios";
import FormData from 'form-data'
import { useSelector } from "react-redux";

export default function Profile() {
  const navigate = useNavigate()
  const [img,setImg]=useState("")
  const id = useSelector((state) => state.user.value.id);
  const uploadimg=(e)=>{
    e.preventDefault()
    const data=new FormData()
    data.append("image",img)
      axios.post('/upload/'+id,data,{ headers: {
        "Content-Type": "multipart/form-data"
      }})
      .then((response)=>{
        console.log(response);
      }).catch((err)=>console.log(err))
 
  }
  useEffect(() => {
    axios
      .get("/user", {
        headers: {
          Authorization: sessionStorage.getItem("jwt"),
        },
      })
      .then(() => {
        alert();
      })
      .catch((err) => {
        navigate('/')
        console.log(err);
      });
    }, []);

  return (
    <div className="vh-100" style={{ backgroundColor: "#9de2ff" }}>
      <MDBContainer>
        <MDBRow className="justify-content-center">
          <MDBCol md="9" lg="7" xl="5" className="mt-5">
            <MDBCard style={{ borderRadius: "15px" }}>
              <MDBCardBody className="p-4">
                <div className="d-flex text-black">
                  <div className="flex-shrink-0">
                    <MDBCardImage
                      style={{ width: "180px", borderRadius: "10px" }}
                      src={img?URL.createObjectURL(img):""}
                      alt="Generic placeholder image"
                      fluid
                    />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <form onSubmit={(e)=>uploadimg(e)}>
                      <input
                        type="file"
                        className="form-control"
                        name="img"
                        id="inputGroupFile04"
                        aria-describedby="inputGroupFileAddon04"
                        aria-label="Upload"
                        onChange={(e)=>setImg(e.target.files[0])}
                      />
                      <button
                        class="btn btn-outline-secondary m-5"
                        type="submit"
                        id="inputGroupFileAddon04"
                      >
                        Upload
                      </button>
                    </form>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
