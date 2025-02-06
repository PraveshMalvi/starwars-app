import { useEffect, useState } from "react";
import {
  Title,
  Table,
  Group,
  Input,
  Text,
  Select,
  Button,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import Navbar from "../../components/Navbar";
import { PlanetData, useFetchPlanets } from "../../store/app.store";
import { IconFilter, IconX, IconEye } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import CommonLoader from "../../components/Loader";

const Planets: React.FC = () => {
  const { data, isLoading, error } = useFetchPlanets();
  const [search, setSearch] = useState("");
  const [climate, setClimate] = useState("");
  const [filteredData, setFilteredData] = useState<PlanetData[]>([]);

  useEffect(() => {
    if (data && data.length > 0) {
      setFilteredData(data);
    }
  }, [data]);

  if (!data) return null;

  const uniqueClimates = Array.from(
    new Set(data.map((item) => item.climate))
  ).map((climate) => ({
    value: climate,
    label: climate,
  }));

  const handleFilter = () => {
    const filtered = data.filter((planet) => {
      const matchesSearch = [planet.name, planet.population, planet.terrain]
        .filter(Boolean)
        .some((field) =>
          field.toLowerCase().includes(search.toLowerCase().trim())
        );

      const matchesClimate = climate ? planet.climate === climate : true;

      return matchesSearch && matchesClimate;
    });
    setFilteredData(filtered);
  };

  const clearFilters = () => {
    setSearch("");
    setClimate("");
    setFilteredData(data);
  };

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
        <Group spacing="lg">
          <div style={{ marginRight: "20px" }}>
            <Title size={"2rem"}>Planets List</Title>
            <Text fz="sm">Total Planets: {filteredData.length}</Text>
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
          <Select
            data={uniqueClimates}
            value={climate}
            onChange={(value: string) => setClimate(value)}
            placeholder="Select Climate"
            styles={{
              input: {
                backgroundColor: "transparent",
                borderRadius: "4px !important",
              },
            }}
            sx={{
                "@media (max-width: 400px)": {
                  width: "100%",
                },
              }}
          />

          <Button
            leftIcon={<IconFilter />}
            variant="outline"
            onClick={handleFilter}
            sx={{
                "@media (max-width: 400px)": {
                  width: "80%",
                },
              }}
          >
            Filter
          </Button>

          <ActionIcon
            sx={{ width: "35px", height: "35px" }}
            onClick={clearFilters}
            variant="filled"
            color="red"
          >
            <IconX size="1.5rem" />
          </ActionIcon>
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
                <th style={{ color: "#000000" }}>Climate</th>
                <th style={{ color: "#000000" }}>Terrain</th>
                <th style={{ color: "#000000" }}>Orbital Period</th>
                <th style={{ color: "#000000" }}>Population</th>
                <th style={{ color: "#000000" }}>Rotation Period</th>
                <th style={{ color: "#000000", borderTopRightRadius: "10px" }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <CommonLoader/>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    style={{ textAlign: "center", padding: "20px" }}
                  >
                    <Text fz="xl" color="#5203fc">
                      No Data Found!
                    </Text>
                  </td>
                </tr>
              ) : (
                filteredData.map((planet, index) => (
                  <tr key={index}>
                    <td>{planet.name}</td>
                    <td>{planet.climate}</td>
                    <td>{planet.terrain}</td>
                    <td>{planet.orbital_period}</td>
                    <td>{planet.population}</td>
                    <td>{planet.rotation_period}</td>
                    <td>
                      <Link
                        to={`/planets/${index + 1}`}
                        style={{ cursor: "pointer" }}
                      >
                        <Tooltip
                          transitionProps={{
                            transition: "skew-up",
                            duration: 300,
                          }}
                          label="View"
                          sx={{ fontSize: "13px" }}
                        >
                          <IconEye color="#5203fc" />
                        </Tooltip>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
      </main>
    </>
  );
};

export default Planets;
