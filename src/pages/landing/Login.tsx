import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Container,
  Title,
  Box,
} from "@mantine/core";
import { useAuthStore } from "../../store/app.store";
import loginBg from "../../assets/images/loginBg.webp";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const success = await login(email, password);
    if (success) navigate("/dashboard");
    else alert("Invalid credentials");
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${loginBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container>
        <Paper
          sx={{
            backdropFilter: "blur(10px)",
            backgroundColor: "#5203fc50",
            border: "1px solid #5203fc",
          }}
          shadow="md"
          p={30}
          radius="md"
          w={window.innerWidth < 400 ? "85vw" : 400}
        >
          <Title align="center" order={2} color="white">
            Login
          </Title>
          <TextInput
            label="Email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            styles={{
              input: {
                backgroundColor: "transparent",
                borderRadius: "4px !important",
                color: "#ffffff",
              },
              label: {
                color: "#ffffff",
              },
              root: {
                "&:focus-within .mantine-PasswordInput-input": {
                  borderColor: "#ffffff !important",
                },
              },
            }}
          />
          <PasswordInput
            label="Password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            mt="md"
            styles={{
              input: {
                backgroundColor: "transparent",
                borderRadius: "4px !important",
                color: "#ffffff",
              },
              label: {
                color: "#ffffff",
              },
              root: {
                "&:focus-within .mantine-PasswordInput-input": {
                  borderColor: "#ffffff !important",
                },
              },
            }}
          />
          <Button fullWidth mt="xl" onClick={handleLogin} bg={"#ffffff40"}>
            Login
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
