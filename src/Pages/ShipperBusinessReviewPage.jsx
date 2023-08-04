import { useState, useEffect, React } from "react";
import { Grid } from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import TripsTable from "../Components/TripsTable";
import OnTimeDeliveryChart from "../Components/OnTimeDeliveryChart";
import DailyDeliveryCountChart from "../Components/DailyDeliveryCountChart";

const ShipperBusinessReviewPage = (props) => {
  const [shipperName, setShipperName] = useState(""); //state for shipperName
  const [tripsData, setTripsData] = useState([]); //state for trips data
  const shipperID = useParams(); //get shipperID object from param in path

  //get shippername by shipper ID to display on page
  const getShipperName = () => {
    const tempArray = props.shipperData;
    const result = tempArray.find((item) => item.id === shipperID.id);
    setShipperName(result.shipperName);
  };

  //get trips for the specific shipper by calling airtable API
  const getTripsData = async () => {
    const tripsArray = [];
    const res = await fetch(
      import.meta.env.VITE_SERVER +
        "appPYAMvKJeeoDs8Y/Trips%20(Hwee)?fields%5B%5D=clientName&fields%5B%5D=clientId&fields%5B%5D=contractorName&fields%5B%5D=contractorId&fields%5B%5D=clientReference&fields%5B%5D=pickupDate&fields%5B%5D=deliveryDate&fields%5B%5D=actualDeliveryDate&fields%5B%5D=origin&fields%5B%5D=destination&fields%5B%5D=status&filterByFormula=(%7BclientId%7D+%3D+%22" +
        shipperID.id +
        "%22)&sort%5B0%5D%5Bfield%5D=deliveryDate&sort%5B0%5D%5Bdirection%5D=desc",
      // ^ retrieves fields needed for display. Filters by clientId. Sorts by deliveryDate desc
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + import.meta.env.VITE_API_KEY,
        },
      }
    );
    if (res.status !== 200) {
      const errorMessage = await res.text();
      throw new Error(`API Error: ${res.status} - ${errorMessage}`);
    } else {
      const data = await res.json(); //data is an object containing records
      //push each record into tripsArray
      data.records.forEach(function (record) {
        tripsArray.push(record.fields);
      });
      //add isOnTime boolean to each object
      tripsArray.forEach(function (record) {
        const dateOptions = {
          year: "numeric",
          month: "short",
          day: "numeric",
        };
        //format date fields
        record.deliveryDate = new Date(record.deliveryDate).toLocaleDateString(
          undefined,
          dateOptions
        );
        record.actualDeliveryDate = new Date(
          record.actualDeliveryDate
        ).toLocaleDateString(undefined, dateOptions);
        record.pickupDate = new Date(record.pickupDate).toLocaleDateString(
          undefined,
          dateOptions
        );
        //determine and store isOnTime in field
        if (record.actualDeliveryDate <= record.deliveryDate) {
          record.isOnTime = true;
        } else {
          record.isOnTime = false;
        }
      });
      setTripsData(tripsArray); //store retrieved trips
    }
  };

  useEffect(() => {
    getShipperName();
    setTripsData([]); //clear existing data
    getTripsData();
  }, []);

  return (
    <div>
      <h2>{shipperName} - Business Review</h2>
      <p>
        <Link to="/dashboard/shippers"> Shippers</Link> / {shipperName}
      </p>

      <div className="charts">
        <Grid>
          <Grid.Col span={6}>
            <OnTimeDeliveryChart tripsData={tripsData} />
          </Grid.Col>
          <Grid.Col span={6}>
            <DailyDeliveryCountChart tripsData={tripsData} />
          </Grid.Col>
        </Grid>
      </div>
      <br />
      <div className="trip-data">
        <h2>Trips</h2>
        <TripsTable tripsData={tripsData}></TripsTable>
      </div>
    </div>
  );
};

export default ShipperBusinessReviewPage;
