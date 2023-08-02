import { DataTable } from "mantine-datatable";
import { Box } from "@mantine/core";
import { React, useEffect, useState, useRef } from "react";

const TripsTable = (props) => {
  // format tripsData to convert isOnTime value to string for display
  // const formattedTripsData = () => {
  //   const array = props.tripsData.map((trip) => ({
  //     ...trip,
  //     isOnTime: trip.isOnTime ? "True" : "False",
  //   }));

  //   return array;
  // };

  const PAGE_SIZE = 15;

  const [formattedTripsData, setFormattedTripData] = useState([]);
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState([]);

  //formats isOnTime when trips data is propped
  useEffect(() => {
    const array = props.tripsData.map((trip, idx) => ({
      ...trip,
      isOnTime: trip.isOnTime ? "True" : "False",
      idx: idx,
    }));
    setFormattedTripData(array);
    const sliced = array.slice(0, PAGE_SIZE);
    setRecords(sliced);
  }, [props.tripsData]);

  useEffect(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setRecords(formattedTripsData.slice(from, to));
  }, [page]);

  return (
    <Box sx={{ height: 300 }}>
      <DataTable
        withBorder
        shadow="sm"
        withColumnBorders
        striped
        records={records}
        columns={[
          { accessor: "recordId", key: "idx" },
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
        totalRecords={formattedTripsData.length}
        recordsPerPage={PAGE_SIZE}
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
