import { DataTable } from "mantine-datatable";
import { Box, Badge, TextInput, Grid } from "@mantine/core";
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

  //for date range
  const [value, setValue] =
    useState < [Date | null, Date | null] > [null, null];
  //Getting error for this line:
  //Uncaught TypeError: boolean false is not iterable
  //(cannot read property Symbol(Symbol.iterator))

  //formats isOnTime when trips data is propped
  useEffect(() => {
    const array = props.tripsData.map((trip, idx) => ({
      ...trip,
      isOnTime: trip.isOnTime ? "True" : "False",
      status:
        trip.status === "completed" ? (
          <Badge color="lime">Completed</Badge>
        ) : trip.status === "booked" ? (
          <Badge>Booked</Badge>
        ) : trip.status === "ongoing" ? (
          <Badge color="yellow">Ongoing</Badge>
        ) : (
          trip.status
        ),

      idx: idx,
    }));
    setFormattedTripData(array);
    const sliced = array.slice(0, PAGE_SIZE);
    setRecords(sortBy(sliced), "deliveryDate");
  }, [props.tripsData]);

  //update data when page changes
  useEffect(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setRecords(formattedTripsData.slice(from, to));
  }, [page]);

  //update data when user searches by recordId
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
        <Grid.Col span={4}>
          <DatePickerInput
            type="range"
            label="Pick dates range"
            placeholder="Pick dates range"
            value={value}
            onChange={setValue}
            mx="auto"
            maw={400}
          />
        </Grid.Col>
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
            { accessor: "pickupDate", sortable: true },
            { accessor: "deliveryDate", sortable: true },
            { accessor: "actualDeliveryDate", sortable: true },
            {
              accessor: "isOnTime",
              title: "Is On Time",
            },
            { accessor: "origin" },
            { accessor: "destination" },
            { accessor: "status" },
          ]}
          //pagination
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
