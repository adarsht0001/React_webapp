import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,MDBCardImage} from "mdb-react-ui-kit";
import axios from "../../axios/axios";
export default function Profile() {
  const navigate = useNavigate();
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
        navigate("/");
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
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                      alt="Generic placeholder image"
                      fluid
                    />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <form>
                      <input
                        type="file"
                        class="form-control"
                        id="inputGroupFile04"
                        aria-describedby="inputGroupFileAddon04"
                        aria-label="Upload"
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
