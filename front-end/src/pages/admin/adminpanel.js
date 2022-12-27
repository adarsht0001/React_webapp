import React, { Fragment } from "react";
import Head from "../../components/navbar/navbar";
import UserTable from "../../components/Table/table";

const Adminpanel = () => {
  return (
    <Fragment>
      <Head Admin/>
      <UserTable />
    </Fragment>
  );
};

export default Adminpanel
