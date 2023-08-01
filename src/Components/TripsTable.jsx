import React from "react";
import { DataTable } from "mantine-datatable";

const TripsTable = (props) => {
  // format tripsData to convert isOnTime value to string for display
  const formattedTripsData = props.tripsData.map((trip) => ({
    ...trip,
    isOnTime: trip.isOnTime ? "True" : "False",
  }));

  return (
    <DataTable
      columns={[
        { accessor: "recordId" },
        { accessor: "pickupDate" },
        { accessor: "deliveryDate" },
        { accessor: "actualDeliveryDate" },
        {
          accessor: "isOnTime",
          title: "Is On Time",
        },
        { accessor: "origin" },
        { accessor: "destination" },
        { accessor: "status" },
      ]}
      records={formattedTripsData}
    />
  );
};

export default TripsTable;
