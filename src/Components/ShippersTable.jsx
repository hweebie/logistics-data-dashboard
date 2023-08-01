import React from "react";
import { Table } from "@mantine/core";
import { Button } from "@mantine/core";
import { Link } from "react-router-dom";

const ShippersTable = (props) => {
  const rows = props.shipperData.map((element) => (
    <tr key={element.name}>
      <td>{element.name}</td>
      <td>{element.tripsLink}</td>
      <td>
        {
          <Link to={`/dashboard/shippers/businessreview/${element.id}`}>
            <Button compact variant="outline">
              {`Business review`}
            </Button>
          </Link>
        }
      </td>
    </tr>
  ));

  return (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Trips Link</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};

export default ShippersTable;
