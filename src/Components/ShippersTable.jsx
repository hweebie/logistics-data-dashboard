import React from "react";
import { DataTable } from "mantine-datatable";
import { Table } from "@mantine/core";
import { Button } from "@mantine/core";
import { Link } from "react-router-dom";

const ShippersTable = (props) => {
  const records = props.shipperData;
  records.forEach(function (record) {
    record.businessReviewButton = (
      <Link to={`/dashboard/shippers/businessreview/${record.id}`}>
        <Button variant="outline">{`Business review`}</Button>
      </Link>
    );
  });

  return (
    <DataTable
      withBorder
      shadow="sm"
      withColumnBorders
      striped
      columns={[
        { accessor: "shipperName" },
        { accessor: "contactName" },
        { accessor: "contactEmail" },
        {
          accessor: "businessReviewButton",
          title: "Business Review Dashboard",
        },
      ]}
      records={records}
    />
  );
};

export default ShippersTable;
