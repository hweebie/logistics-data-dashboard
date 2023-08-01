import React from "react";
import { Table } from "@mantine/core";

const TripsTable = (props) => {
  const rows = props.tripsData.map((element) => (
    <tr key={element.recordId}>
      <td>{element.recordId}</td>
      <td>{element.pickupDate}</td>
      <td>{element.deliveryDate}</td>
      <td>{element.actualDeliveryDate}</td>
      <td>TBA</td>
      <td>{element.origin}</td>
      <td>{element.destination}</td>
      <td>{element.status}</td>
    </tr>
  ));

  return (
    <Table>
      <thead>
        <tr>
          <th>Reference No.</th>
          <th>Pick up date</th>
          <th>Requested delivery date</th>
          <th>Actual delivery date</th>
          <th>Is on time?</th>
          {/* ^ todo: add this */}
          <th>Origin</th>
          <th>Destination</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};

export default TripsTable;
