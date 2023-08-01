import React from "react";
import { DataTable } from "mantine-datatable";
import { Table } from "@mantine/core";
import { Button } from "@mantine/core";
import { Link } from "react-router-dom";

const ShippersTable = (props) => {
  // const records = props.shipperData;
  // records.forEach(function(record)=>{
  //   record.businessReviewButton =  <Link to={`/dashboard/shippers/businessreview/${element.id}`}>
  //   <Button variant="outline">{`Business review`}</Button>
  // </Link>
  // })
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
    // <DataTable
    //   withBorder
    //   shadow="sm"
    //   withColumnBorders
    //   striped
    //   columns={[
    //     { accessor: "shipperName" },
    //     { accessor: "contactName" },
    //     { accessor: "contactEmail" },
    //     { accessor: "businessReviewButton" },
    //   ]}
    //   records={records}
    // />

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
