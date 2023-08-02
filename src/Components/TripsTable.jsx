import { DataTable } from "mantine-datatable";
import { Box, Button, TextInput, Grid } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconSearch } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useDebouncedValue } from "@mantine/hooks";
import { React, useEffect, useState } from "react";
import sortBy from "lodash/sortBy";

const TripsTable = (props) => {
  //for table pagination
  const PAGE_SIZE = 15;
  const [formattedTripsData, setFormattedTripData] = useState([]);
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState([]);
  //for search
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebouncedValue(query, 200);
  //for sorting. defaults to sort by deliveryDate desc
  const [sortStatus, setSortStatus] = useState({
    column: "name",
    direction: "asc",
  });

  //formats isOnTime when trips data is propped
  useEffect(() => {
    const array = props.tripsData.map((trip, idx) => ({
      ...trip,
      isOnTime: trip.isOnTime ? "True" : "False",
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

  //update data when user sorts
  useEffect(() => {
    const sortedRecords = [...records].sort((a, b) => {
      const aValue = a[sortStatus.column];
      const bValue = b[sortStatus.column];

      if (aValue < bValue) {
        return sortStatus.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortStatus.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setRecords(sortedRecords);
  }, [sortStatus]);

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
          //handle sort status
          sortStatus={sortStatus}
          onSortStatusChange={setSortStatus}
        />
      </Box>
    </>
  );
};
export default TripsTable;
