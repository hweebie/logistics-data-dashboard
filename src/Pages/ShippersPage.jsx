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
      id: "",
      shipperName: "",
      contactName: "",
      contactEmail: "",
    },
    transformValues: (values) => ({
      id: randomString,
      shipperName: values.shipperName,
      contactName: values.contactName,
      contactEmail: values.contactEmail,
    }),

    validate: {
      shipperName: (value) =>
        value.length < 2 ? "Shipper Name must have at least 2 letters" : null,
      contactName: (value) =>
        value.length < 2 ? "Contact Name must have at least 2 letters" : null,
      contactEmail: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email",
    },
  });

  const handleError = (errors) => {
    if (errors.shipperName) {
      notifications.show({
        message: "Please fill shipper name field",
        color: "red",
      });
    } else if (errors.contactName) {
      notifications.show({
        message: "Please fill contact name field",
        color: "red",
      });
    } else if (errors.contactEmail) {
      notifications.show({
        message: "Please fill contact email field",
        color: "red",
      });
    }
  };

  //generate random string to use as new shipper ID
  function generateRandomString(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters.charAt(randomIndex);
    }
    return result;
  }
  const randomString = generateRandomString(17);

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
          <form
            onSubmit={form.onSubmit((values) => {
              console.log(values);
              props.setShipperData((currentData) => {
                return [...currentData, values];
              });
            }, handleError)}
          >
            <TextInput
              withAsterisk
              label="Shipper Name"
              placeholder="Shipper Name"
              {...form.getInputProps("shipperName")}
            />

            <TextInput
              withAsterisk
              label="Contact Name"
              placeholder="Shipper contact name"
              {...form.getInputProps("contactName")}
            />

            <TextInput
              withAsterisk
              label="Contact Email"
              placeholder="Shipper contact email"
              {...form.getInputProps("contactEmail")}
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
