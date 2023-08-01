import { React, useState } from "react";
import ShippersTable from "../Components/ShippersTable";
import { useDisclosure } from "@mantine/hooks";
import { Modal, TextInput, Button, Group, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

const ShippersPage = (props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      name: "",
      referralCode: "",
      id: "",
    },
    validate: {
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      referralCode: (value) =>
        value.length == 8 ? "Referral code must be a 6-character code" : null,
    },
  });
  const handleError = (errors) => {
    if (errors.name) {
      notifications.show({ message: "Please fill name field", color: "red" });
    } else if (errors.referralCode) {
      notifications.show({
        message: "Please input 6-digit referral code",
        color: "red",
      });
    }
  };

  const handleSubmit = (name, referralCode) => {
    event.preventDefault();
    //lift state to parent
    const url = "	https://dashboard.shipamiga.com/shippers/" + referralCode;
    console.log(url);
    const id = 1234; //randomly generate 17 char id
    console.log(id);
    props.setShipperData([...shipperData, { name, url, id }]);

    //TODO: reset form after click handled
  };

  return (
    <>
      <div>
        <h1>Shippers</h1>
        <div>
          <Group position="left">
            <Button onClick={open}>Add Shipper</Button>
          </Group>
        </div>
        <br />
        <div>
          <ShippersTable shipperData={props.shipperData} />
        </div>
      </div>
      <Modal opened={opened} onClose={close} title="Add Shipper" centered>
        <Box maw={300} mx="auto">
          <form onSubmit={form.onSubmit(console.log("submitted"), handleError)}>
            <TextInput
              withAsterisk
              label="Name"
              placeholder="Shipper Name"
              {...form.getInputProps("name")}
            />

            <TextInput
              withAsterisk
              label="Referral Code"
              placeholder="6-character referral code"
              {...form.getInputProps("referralCode")}
            />

            <Group position="right" mt="md">
              <Button type="submit">Submit</Button>
            </Group>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default ShippersPage;
