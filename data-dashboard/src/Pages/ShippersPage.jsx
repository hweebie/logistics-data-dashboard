import { React, useState } from "react";
import ShippersTable from "../Components/ShippersTable";

const ShippersPage = (props) => {
  return (
    <div>
      <h1>Shippers</h1>
      <div>
        <ShippersTable shipperData={props.shipperData} />
      </div>
    </div>
  );
};

export default ShippersPage;
