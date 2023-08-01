import { useState, useEffect, React } from "react";
import { Grid } from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import Airtable from "airtable";
import TripsTable from "../Components/TripsTable";

const ShipperBusinessReviewPage = (props) => {
  const [tripsData, setTripsData] = useState([]);

  //get shippername by shipper ID to display on page
  const [shipperName, setShipperName] = useState("");
  const shipperID = useParams();
  const getShipperName = () => {
    const tempArray = props.shipperData;
    const result = tempArray.find((item) => item.id === shipperID.id);
    setShipperName(result.name);
  };

  //get trips for the specific shipper by calling airtable API
  const getTripsData = () => {
    const tripsArray = [];

    Airtable.configure({
      endpointUrl: "https://api.airtable.com",
      apiKey:
        "patslEakZwYSUfW3Y.e100026e74bc8543246f5fa474b283d01ae7afc0e430a6fc2bd60274eb1dab9c", //TODO: store elsewhere
    });
    var base = Airtable.base("appPYAMvKJeeoDs8Y");

    base("Trips (Hwee)")
      .select({
        //retrieve only these fields from the table
        fields: [
          "clientName",
          "clientId",
          "contractorName",
          "contractorId",
          "recordId",
          "pickupDate",
          "deliveryDate",
          "actualDeliveryDate",
          "origin",
          "destination",
          "status",
          "createdTimestamp",
        ],
        filterByFormula: `({clientId} = "recjLPXLxSKFtMHGc")`,
        view: "Grid view",
        sort: [{ field: "createdTimestamp", direction: "desc" }],
      })
      .eachPage(
        function page(records, fetchNextPage) {
          // This function (`page`) will get called for each page of records.

          records.forEach(function (record) {
            tripsArray.push(record.fields); //push each record into tripsArray
          });

          setTripsData((currentState) => {
            return [...currentState, ...tripsArray];
          });

          // To fetch the next page of records, call `fetchNextPage`.
          // If there are more records, `page` will get called again.
          // If there are no more records, `done` will get called.
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            console.error(err);
            return;
          }
        }
      );

    // setTripsData(tripsArray);
  };

  useEffect(() => {
    setTripsData([]);
    getShipperName();
    getTripsData();
  }, []);

  return (
    <div>
      <h2>{shipperName} - Business Review</h2>
      <p>
        <Link to="/dashboard/shippers"> Shippers</Link> / {shipperName}
      </p>
      <br />
      <div className="charts">
        <Grid>
          <Grid.Col span={6}>
            <h3>On-time delivery</h3> <br />
            Chart 1
          </Grid.Col>
          <Grid.Col span={6}>
            <h3>Total trips</h3> <br />
            Chart 2
          </Grid.Col>
        </Grid>
      </div>
      <br />
      <div className="trip-data">
        <h2>Trips</h2>
        <p>Search bar, date filter</p>
        <TripsTable tripsData={tripsData}></TripsTable>
      </div>
    </div>
  );
};

export default ShipperBusinessReviewPage;
