import React from "react";
import { Table } from "@mantine/core";
import { Button } from "@mantine/core";
import { Link } from "react-router-dom";

const ShippersTable = (props) => {
  const rows = props.shipperData.map((element) => (
    <tr key={element.id}>
      <td>{element.shipperName}</td>
      <td>{element.contactName}</td>
      <td>{element.contactEmail}</td>
      <td>
        {
          <Link to={`/dashboard/shippers/businessreview/${element.id}`}>
            <Button variant="outline">{`Business review`}</Button>
          </Link>
        }
      </td>
    </tr>
  ));

  return (
    <Table>
      <thead>
        <tr>
          <th>Shipper Name</th>
          <th>Contact Name</th>
          <th>Contact Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};

export default ShippersTable;
