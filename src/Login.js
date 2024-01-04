import React, { useState } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import Home from "./Home";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [Remember, setRemember] = useState();
  const [check, setCheck] = useState(false);

  const login = async (username, password) => {
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setCheck(true);
      localStorage.setItem("token", data.token);
    } catch (error) {
      console.error("error", error);
    }
  };

  const formsubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };
  return (
    <>
      {check ? (
        <Home />
      ) : (
        <Flex bg="gray.100" align="center" justify="center" h="100vh">
          <Box bg="white" p={6} rounded="md">
            <form onSubmit={formsubmit}>
              <VStack spacing={4} align="flex-start">
                <FormControl>
                  <FormLabel htmlFor="email">username</FormLabel>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    variant="filled"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    variant="filled"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
                <Checkbox
                  id="rememberMe"
                  name="rememberMe"
                  value={Remember}
                  colorScheme="purple"
                  onChange={(e) => setRemember(e.target.checked)}
                >
                  Remember me?
                </Checkbox>
                <Button type="submit" colorScheme="purple" width="full">
                  Login
                </Button>
              </VStack>
            </form>
          </Box>
        </Flex>
      )}
    </>
  );
}

export default Login;
