import { DataTable } from "mantine-datatable";
import { Box } from "@mantine/core";
import { React, useEffect, useState } from "react";

const TripsTable = (props) => {
  // format tripsData to convert isOnTime value to string for display
  const formattedTripsData = props.tripsData.map((trip) => ({
    ...trip,
    isOnTime: trip.isOnTime ? "True" : "False",
  }));

  const pageSize = 15;
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(formattedTripsData.slice(0, pageSize));

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecords(formattedTripsData.slice(from, to));
  }, [page]);

  return (
    <Box sx={{ height: 300 }}>
      <DataTable
        withBorder
        shadow="sm"
        withColumnBorders
        striped
        columns={[
          { accessor: "recordId", key: "recordId" },
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
        records={records}
        totalRecords={formattedTripsData.length}
        recordsPerPage={pageSize}
        page={page}
        onPageChange={(p) => setPage(p)}
        //display loading text when loading
        loadingText="Loading..."
        //show message when no records found
        noRecordsText="No records found"
        //pagination text
        paginationText={({ from, to, totalRecords }) =>
          `Records ${from} - ${to} of ${totalRecords}`
        }
      />
    </Box>
  );
};
export default TripsTable;
