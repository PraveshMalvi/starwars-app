import {
  Container,
  Title,
  Text,
  Breadcrumbs,
  Anchor,
  Card,
  Group,
  Badge,
  Button,
  Modal,
  SimpleGrid,
  Paper,
  Box,
  Stack,
} from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  IconAB2,
  IconHistoryToggle,
  IconRipple,
  IconRulerMeasure,
  IconUsersGroup,
} from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";
import Navbar from "../../components/Navbar";
import CommonLoader from "../../components/CommonLoader";

const fetchPlanetDetails = async (id: string) => {
  const response = await fetch(`https://swapi.dev/api/planets/${id}/`);
  if (!response.ok) {
    throw new Error("Failed to fetch planet details");
  }
  return response.json();
};

const PlanetsView = () => {
  const { id } = useParams<{ id: string }>();
  const [modalOpened, setModalOpened] = useState({
    people: false,
    film: false,
    type: "",
  });
  const isMobile = useMediaQuery("(max-width: 640px)");

  const { data, isLoading, error } = useQuery({
    queryKey: ["planet", id],
    queryFn: () => fetchPlanetDetails(id!),
    enabled: !!id,
  });

  if (error) return <p>Error loading planet details.</p>;

  const crumbLinks = [
    { title: "Planets List", href: "/planets" },
    { title: "View Details", href: "" },
  ].map((item, index) => (
    <Anchor
      color={`${item.href === "" ? "#5203fc" : "#222222"}`}
      size={"xs"}
      href={item.href}
      key={index}
    >
      {item.title}
    </Anchor>
  ));

  return (
    <>
      <Navbar />
      <main
        className="dashboardWrapper"
        style={{
          paddingLeft: window.innerWidth < 400 ? "16px" : "110px",
          paddingRight: window.innerWidth < 400 ? "16px" : "40px",
        }}
      >
        <Breadcrumbs>{crumbLinks}</Breadcrumbs>

        {isLoading ? (
          <CommonLoader />
        ) : (
          <Container size="lg" className="planet-container">
            <Card shadow="md" p="lg" radius="md">
              <Title align="center" mb="md">
                {data.name}
              </Title>
              {isMobile ? (
                <Stack align="left" mb="md">
                  <Badge size="lg" p={15} color="blue">
                    Climate: {data.climate}
                  </Badge>
                  <Badge size="lg" p={15} color="green">
                    Terrain: {data.terrain}
                  </Badge>
                  <Badge size="lg" p={15} color="orange">
                    Gravity: {data.gravity}
                  </Badge>
                </Stack>
              ) : (
                <Group position="center" mb="md">
                  <Badge size="lg" p={15} color="blue">
                    Climate: {data.climate}
                  </Badge>
                  <Badge size="lg" p={15} color="green">
                    Terrain: {data.terrain}
                  </Badge>
                  <Badge size="lg" p={15} color="orange">
                    Gravity: {data.gravity}
                  </Badge>
                </Group>
              )}
              <SimpleGrid
                cols={3}
                spacing="lg"
                mt={30}
                breakpoints={[
                  { maxWidth: "md", cols: 2 },
                  { maxWidth: "sm", cols: 1 },
                ]}
              >
                <Paper
                  withBorder
                  p="xl"
                  display={"flex"}
                  radius={"md"}
                  sx={{
                    justifyContent: "start",
                    alignItems: "center",
                    gap: "15px",
                  }}
                >
                  <Box
                    bg={"#f1f1f1"}
                    w={60}
                    h={60}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "8px",
                    }}
                  >
                    <IconHistoryToggle />
                  </Box>
                  <Text
                    align="left"
                    sx={{
                      fontSize: "16px",
                      "@media (min-width: 768px)": { fontSize: "18px" },
                      "@media (min-width: 1024px)": { fontSize: "20px" },
                    }}
                  >
                    Rotation Period:{" "}
                    <Text color="indigo">{data.rotation_period} hours</Text>
                  </Text>
                </Paper>
                <Paper
                  withBorder
                  p="xl"
                  display={"flex"}
                  radius={"md"}
                  sx={{
                    justifyContent: "start",
                    alignItems: "center",
                    gap: "15px",
                  }}
                >
                  <Box
                    bg={"#f1f1f1"}
                    w={60}
                    h={60}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "8px",
                    }}
                  >
                    <IconAB2 />
                  </Box>
                  <Text
                    align="left"
                    sx={{
                      fontSize: "16px",
                      "@media (min-width: 768px)": { fontSize: "18px" },
                      "@media (min-width: 1024px)": { fontSize: "20px" },
                    }}
                  >
                    Orbital Period:{" "}
                    <Text color="indigo">{data.orbital_period} days</Text>
                  </Text>
                </Paper>
                <Paper
                  withBorder
                  p="xl"
                  display={"flex"}
                  radius={"md"}
                  sx={{
                    justifyContent: "start",
                    alignItems: "center",
                    gap: "15px",
                  }}
                >
                  <Box
                    bg={"#f1f1f1"}
                    w={60}
                    h={60}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "8px",
                    }}
                  >
                    <IconRulerMeasure />
                  </Box>
                  <Text
                    align="left"
                    sx={{
                      fontSize: "16px",
                      "@media (min-width: 768px)": { fontSize: "18px" },
                      "@media (min-width: 1024px)": { fontSize: "20px" },
                    }}
                  >
                    Diameter: <Text color="indigo">{data.diameter} km</Text>
                  </Text>
                </Paper>
                <Paper
                  withBorder
                  p="xl"
                  display={"flex"}
                  radius={"md"}
                  sx={{
                    justifyContent: "start",
                    alignItems: "center",
                    gap: "15px",
                  }}
                >
                  <Box
                    bg={"#f1f1f1"}
                    w={60}
                    h={60}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "8px",
                    }}
                  >
                    <IconRipple />
                  </Box>
                  <Text
                    align="left"
                    sx={{
                      fontSize: "16px",
                      "@media (min-width: 768px)": { fontSize: "18px" },
                      "@media (min-width: 1024px)": { fontSize: "20px" },
                    }}
                  >
                    Surface Water:{" "}
                    <Text color="indigo">{data.surface_water}%</Text>
                  </Text>
                </Paper>
                <Paper
                  withBorder
                  p="xl"
                  display={"flex"}
                  radius={"md"}
                  sx={{
                    justifyContent: "start",
                    alignItems: "center",
                    gap: "15px",
                  }}
                >
                  <Box
                    bg={"#f1f1f1"}
                    w={60}
                    h={60}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "8px",
                    }}
                  >
                    <IconUsersGroup />
                  </Box>
                  <Text
                    align="left"
                    sx={{
                      fontSize: "16px",
                      "@media (min-width: 768px)": { fontSize: "18px" },
                      "@media (min-width: 1024px)": { fontSize: "20px" },
                    }}
                  >
                    Population: <Text color="indigo">{data.population}</Text>
                  </Text>
                </Paper>
              </SimpleGrid>
              <Group position="center" mt={30}>
                <Button
                  color="indigo"
                  onClick={() =>
                    setModalOpened({ ...modalOpened, film: true, type: "film" })
                  }
                >
                  Go To Films
                </Button>
                {/* <Button
                  color="indigo"
                  onClick={() =>
                    setModalOpened({
                      ...modalOpened,
                      film: true,
                      type: "resident",
                    })
                  }
                >
                  Go To People
                </Button> */}
              </Group>
            </Card>
          </Container>
        )}

        <Modal
          opened={modalOpened?.film}
          onClose={() =>
            setModalOpened({ ...modalOpened, film: false, type: "film" })
          }
          title="Films"
          centered
        >
          <div
            style={{
              maxHeight: "400px",
              overflowY: "auto",
            }}
          >
            {data === undefined || data === null || data.films.length === 0 ? (
              <Text align="center">No Films found.</Text>
            ) : modalOpened?.type === "film" ? (
              data.films.map((url: string, index: number) => {
                const secondLastChar = url.charAt(url.length - 2);
                return (
                  <Link
                    to={`/films/${secondLastChar}`}
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      margin: "10px",
                      padding: "5px 10px",
                      backgroundColor: "#f1f1f1",
                      borderRadius: "8px",
                    }}
                  >
                    {url}
                  </Link>
                );
              })
            ) : (
              data.residents.map((url: string, index: number) => {
                const secondLastChar = url.charAt(url.length - 2);
                return (
                  <Link
                    to={`/people/${secondLastChar}`}
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      margin: "10px",
                      padding: "5px 10px",
                      backgroundColor: "#f1f1f1",
                      borderRadius: "8px",
                    }}
                  >
                    {url}
                  </Link>
                );
              })
            )}
          </div>
        </Modal>
      </main>
    </>
  );
};

export default PlanetsView;
