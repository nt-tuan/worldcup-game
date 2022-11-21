import { Flex } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const nav = useNavigate();
  React.useEffect(() => {
    localStorage.setItem("token", "");
    localStorage.setItem("token_exp", "");
    setTimeout(() => {
      nav("/");
    }, 2000);
  }, [nav]);
  return (
    <Flex sx={{ height: "500px" }} align="center" justify="center">
      <span>Logout...</span>
    </Flex>
  );
};
