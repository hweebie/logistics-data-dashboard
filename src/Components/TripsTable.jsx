import { DataTable } from "mantine-datatable";
import { Box, Button, TextInput, Grid } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconSearch } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useDebouncedValue } from "@mantine/hooks";
import { React, useEffect, useState } from "react";

const TripsTable = (props) => {
  //for table pagination
  const PAGE_SIZE = 15;
  const [formattedTripsData, setFormattedTripData] = useState([]);
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState([]);
  //for search
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebouncedValue(query, 200);

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

  useEffect(() => {
    setRecords(
      formattedTripsData.filter(({ recordId }) => {
        if (
          debouncedQuery !== "" &&
          !`${recordId}`.includes(debouncedQuery.trim())
        ) {
          return false;
        }

        return true;
      })
    );
  }, [debouncedQuery]);

  return (
    <>
      <Grid>
        <Grid.Col span={4}>
          <TextInput
            placeholder="Search using recordId..."
            icon={<IconSearch size={16} />}
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
          />
        </Grid.Col>
        <Grid.Col span={4}>TBA: Date picker</Grid.Col>
      </Grid>
      <br />
      <Box sx={{ height: 300 }}>
        <DataTable
          withBorder
          shadow="sm"
          withColumnBorders
          striped
          records={records}
          columns={[
            { accessor: "recordId", title: "Reference no.", key: "idx" },
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
    </>
  );
};
export default TripsTable;
