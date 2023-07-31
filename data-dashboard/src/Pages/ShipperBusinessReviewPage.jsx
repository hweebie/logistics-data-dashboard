import { useState, useEffect, React } from "react";
import { Grid } from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import Airtable from "airtable";

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

  //get records
  // credentials:patS9zTnTTU3pVbtG
  // URL: https://api.airtable.com/v0/appPYAMvKJeeoDs8Y/Trips%2520(Hwee)?fields%5B%5D=clientName&fields%5B%5D=clientId&fields%5B%5D=recordId&fields%5B%5D=pickupDate&fields%5B%5D=deliveryDate&fields%5B%5D=actualDeliveryDate&fields%5B%5D=origin&fields%5B%5D=destination&fields%5B%5D=status&fields%5B%5D=createdTimestamp&filterByFormula=AND(%7BcontractorID%7D%3D%22recqV6q63wMcfr6U6%22%2C%7BclientID%7D+%3D+%22recjLPXLxSKFtMHGc%22)&sort%5B0%5D%5Bfield%5D=&sort%5B0%5D%5Bdirection%5D=asc

  //   const apiKey = "patS9zTnTTU3pVbtG";
  //   const url =
  //     "https://api.airtable.com/v0/appPYAMvKJeeoDs8Y/Trips%2520(Hwee)?fields%5B%5D=clientName&fields%5B%5D=clientId&fields%5B%5D=recordId&fields%5B%5D=pickupDate&fields%5B%5D=deliveryDate&fields%5B%5D=actualDeliveryDate&fields%5B%5D=origin&fields%5B%5D=destination&fields%5B%5D=status&fields%5B%5D=createdTimestamp&filterByFormula=AND(%7BcontractorID%7D%3D%22recqV6q63wMcfr6U6%22%2C%7BclientID%7D+%3D+%22recjLPXLxSKFtMHGc%22)&sort%5B0%5D%5Bfield%5D=&sort%5B0%5D%5Bdirection%5D=asc";
  //   const getTripsData = async () => {
  //     const headers = {
  //       Authorization: `Bearer ${apiKey}`,
  //     };

  //     // Make the GET request
  //     const res = await fetch(url, { headers });
  //     if (res.status === 200) {
  //       const data = await res.json();
  //       setTripsData(data);
  //     } else {
  //       const errorMessage = await res.text();
  //       throw new Error(`API Error: ${res.status} - ${errorMessage}`);
  //     }
  //   };

  const getTripsData = () => {
    Airtable.configure({
      endpointUrl: "https://api.airtable.com",
      apiKey:
        "patslEakZwYSUfW3Y.e100026e74bc8543246f5fa474b283d01ae7afc0e430a6fc2bd60274eb1dab9c",
    });
    var base = Airtable.base("appPYAMvKJeeoDs8Y");

    base("Trips (Hwee)")
      .select({
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
            console.log("Retrieved", record.fields);
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
        <p>{JSON.stringify(tripsData)}</p>
      </div>
    </div>
  );
};

export default ShipperBusinessReviewPage;
