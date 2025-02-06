import { Box, Loader, Text } from "@mantine/core";
import React from "react";

const CommonLoader = () => {
  return (
    <Box
      style={{
        width: "100%",
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Loader color="blue" />
      <Text size={"xl"}>Loading</Text>
    </Box>
  );
};

export default CommonLoader;
