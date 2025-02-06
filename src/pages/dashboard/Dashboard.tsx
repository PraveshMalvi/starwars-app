import { useState } from "react";
import {
  Title,
  Table,
  Grid,
  Group,
  Input,
  Text,
} from "@mantine/core";
import Navbar from "../../components/Navbar";
import { useFetchUsers } from "../../store/app.store";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Flex } from "@mantine/core";
import CommonLoader from "../../components/CommonLoader";

const Dashboard: React.FC = () => {
  const { data, isLoading, error } = useFetchUsers();
  const [search, setSearch] = useState("");

  if (!data) return null;

  const filteredUsers = data.filter((user) =>
    [user.name, user.email, user.address?.city, user.company?.name]
      .filter(Boolean)
      .some((field) =>
        field.toLowerCase().includes(search.toLowerCase().trim())
      )
  );

  const cityData = filteredUsers.reduce((acc, user) => {
    const city = user.address?.city ?? "Unknown";
    acc[city] = (acc[city] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(cityData).map(([city, count]) => ({
    city,
    count,
  }));

  if (isLoading)
    return (
      <CommonLoader/>
    );

  if (error) return <p>Error loading data.</p>;

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
        <Group position="apart">
          <div>
            <Title size={"2rem"}>Users List</Title>
            <Text fz="sm">Total Users: {filteredUsers.length}</Text>
          </div>
          <Input
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              "@media (max-width: 400px)": {
                width: "100%",
              },
            }}
          />
        </Group>

        <div style={{ overflowX: "auto", maxWidth: "100%" }}>
          <Table
            striped
            highlightOnHover
            sx={{ marginTop: "10px", minWidth: "900px" }}
            mt={"xl"}
          >
            <thead>
              <tr style={{ backgroundColor: "#f1f1f1" }}>
                <th style={{ color: "#000000", borderTopLeftRadius: "10px" }}>
                  Name
                </th>
                <th style={{ color: "#000000" }}>Email</th>
                <th style={{ color: "#000000" }}>City</th>
                <th style={{ color: "#000000", borderTopRightRadius: "10px" }}>
                  Company
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    style={{ textAlign: "center", padding: "20px" }}
                  >
                    <Text fz="xl" color="#5203fc">
                      No Data Found!
                    </Text>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.address?.city ?? "Unknown"}</td>
                    <td>{user.company?.name ?? "N/A"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>

        <Grid gutter="lg">
          <Grid.Col xs={12} md={6}>
            <Title sx={{ marginBottom: "10px" }} order={3} mt="lg">
              User Locations
            </Title>
            <MapContainer
              center={[0, 0]}
              zoom={2}
              style={{ height: "400px", width: "100%", zIndex: 98 }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" zIndex={98} />
              {filteredUsers.map((user) =>
                user.address?.geo ? (
                  <Marker
                    key={user.id}
                    position={[
                      parseFloat(user.address.geo.lat),
                      parseFloat(user.address.geo.lng),
                    ]}
                  >
                    <Popup>
                      {user.name} <br /> {user.address.city}
                    </Popup>
                  </Marker>
                ) : null
              )}
            </MapContainer>
          </Grid.Col>

          <Grid.Col xs={12} md={6} sx={{overflowX: "auto"}}>
            <Title sx={{ marginBottom: "5px" }} order={3} mt="lg">
              Users Per City
            </Title>
            <ResponsiveContainer width="100%" height={400} minWidth={600}>
              {chartData?.length === 0 ? (
                <Flex
                  mih={"100%"}
                  bg="rgba(0, 0, 0, .1)"
                  gap="md"
                  justify="center"
                  align="center"
                  direction="row"
                  wrap="nowrap"
                >
                  <Text fz="xl" color="#5203fc">
                    No Data Found!
                  </Text>
                </Flex>
              ) : (
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis
                    dataKey="city"
                    interval={0}
                    tick={{ fontSize: "1rem" }}
                    tickFormatter={(city) =>
                      typeof city === "string" ? city.substring(0, 5) : ""
                    }
                  />
                  <YAxis tick={{ fontSize: "1rem" }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#793aff" />
                </BarChart>
              )}
            </ResponsiveContainer>
          </Grid.Col>
        </Grid>
      </main>
    </>
  );
};

export default Dashboard;
