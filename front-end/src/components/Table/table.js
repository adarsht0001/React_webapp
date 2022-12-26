import { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/Table";
import axios from "../../axios/axios";
function UserTable() {
  const [user,setUser]=useState([])
  useEffect(()=>{
    axios.get('/userlist').then((response)=>{
      setUser(response.data.result)
    })
  },[])
  return (
    <Container className="p-5">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>mail</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {user.map((e,i) => {
            return(
          <tr key={i}>
            <td>{i+1}</td>
            <td>{e.name}</td>
            <td>{e.email}</td>
            <td></td>
          </tr>
            )
          })}
        </tbody>
      </Table>
    </Container>
  );
}

export default UserTable;
