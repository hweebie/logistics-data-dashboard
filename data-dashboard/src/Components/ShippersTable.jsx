import React from "react";
import { Table } from "@mantine/core";
import { Button } from "@mantine/core";

const ShippersTable = () => {
  const shipperData = [
    {
      name: "Bilis Agriculture",
      tripsLink: "Trips Link",
      actions: "Business review", //TODO: add button and link to shipper page
    },
    {
      name: "Starbucks",
      tripsLink: "Trips Link",
      actions: "Business review", //TODO: add button and link to shipper page
    },
    {
      name: "Love, Bonito",
      tripsLink: "Trips Link",
      actions: "Business review", //TODO: add button and link to shipper page
    },
  ];
  const rows = shipperData.map((element) => (
    <tr key={element.name}>
      <td>{element.name}</td>
      <td>{element.tripsLink}</td>
      <td>
        {
          <Button compact variant="outline">
            {element.actions}
          </Button>
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
