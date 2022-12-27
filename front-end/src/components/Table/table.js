import { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/Table";
import axios from "../../axios/axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
function UserTable() {
  const navigate=useNavigate()
  const [user, setUser] = useState([]);
  const [search,setSearch]=useState('')
  useEffect(() => {
    axios.get("/userlist").then((response) => {
      setUser(response.data.result);
    });
  }, []);
  return (
    <Container>
      <Form className="d-flex p-5">
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2 w-50"
          size="sm"
          aria-label="Search"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />
        <Button className="float-end pr-5"
          onClick={() => {
            navigate('/adminsignup')
          }}
          variant="outline-success"
        >
          Add User
        </Button>
      </Form>
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
          {user.filter((value) => {
              if (search === "") {
                return value;
              } else if (
                value.name.toLowerCase().includes(search.toLowerCase())
              ) {
                return value;
              }
            }).map((e, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}

export default UserTable;
