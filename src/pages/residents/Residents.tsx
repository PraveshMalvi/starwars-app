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
  Modal,
  Stack,
  Box,
} from "@mantine/core";
import Navbar from "../../components/Navbar";
import { PeopleData, useAppStore, useFetchPeople } from "../../store/app.store";
import { IconFilter, IconX, IconUser, IconEdit } from "@tabler/icons-react";
import CommonLoader from "../../components/CommonLoader";

const Residents: React.FC = () => {
  const { data, isLoading, error } = useFetchPeople();
  const { addPerson, updatePerson, people } = useAppStore();

  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("");
  const [filteredData, setFilteredData] = useState<PeopleData[]>([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingResident, setEditingResident] = useState<PeopleData | null>(
    null
  );
  const initialData = {
    name: "",
    height: "",
    mass: "",
    hair_color: "",
    skin_color: "",
    eye_color: "",
    birth_year: "",
    gender: "",
  };
  const [residentData, setResidentData] = useState<PeopleData>(initialData);

  useEffect(() => {
    if (people.length > 0) {
      setFilteredData(people);
    }
  }, [people]);

  if (isLoading) return <CommonLoader />;

  if (!data) return null;

  const uniqueGenders = Array.from(
    new Set(people.map((item) => item.gender))
  ).map((gender) => ({
    value: gender,
    label: gender,
  }));

  const handleFilter = () => {
    const filtered = people.filter((resident) => {
      const matchesSearch = Object.values(resident)
        .filter(Boolean)
        .some((field) =>
          field.toString().toLowerCase().includes(search.toLowerCase().trim())
        );

      const matchesGender = gender ? resident.gender === gender : true;
      return matchesSearch && matchesGender;
    });

    setFilteredData(filtered);
  };

  const clearFilters = () => {
    setSearch("");
    setGender("");
    setFilteredData(people);
  };

  const handleSaveResident = () => {
    if (editingResident) {
      updatePerson(editingResident.id!, residentData);
    } else {
      addPerson({ ...residentData, id: Date.now() });
    }
    setModalOpen(false);
    setEditingResident(null);
    setResidentData({
      name: "",
      height: "",
      mass: "",
      hair_color: "",
      skin_color: "",
      eye_color: "",
      birth_year: "",
      gender: "",
    });
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
        <Group
          spacing="lg"
          sx={{
            flexDirection: "column",
            width: "100%",
            alignItems: "start",
            "@media (min-width: 768px)": {
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
            },
          }}
        >
          <div style={{ marginRight: "20px" }}>
            <Title size={"2rem"}>Residents List</Title>
            <Text fz="sm">Total Residents: {filteredData.length}</Text>
          </div>
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
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
              data={uniqueGenders}
              value={gender}
              onChange={(value: string) => setGender(value)}
              placeholder="Select Gender"
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
            <Group
              spacing="lg"
              sx={{
                "@media (max-width: 400px)": {
                  width: "100%",
                },
              }}
            >
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
            <Button
              leftIcon={<IconUser />}
              variant="gradient"
              gradient={{ from: "#5203fc", to: "#5203fc" }}
              onClick={() => {
                setEditingResident(null);
                setModalOpen(true);
              }}
              sx={{
                "@media (max-width: 400px)": {
                  width: "100%",
                },
              }}
            >
              Create Resident
            </Button>
          </Box>
        </Group>

        <div style={{ overflowX: "auto", maxWidth: "100%" }}>
          <Table
            striped
            highlightOnHover
            sx={{ marginTop: "10px", minWidth: "900px" }}
            mt={20}
          >
            <thead>
              <tr style={{ backgroundColor: "#f1f1f1" }}>
                <th style={{ color: "#000000", borderTopLeftRadius: "10px" }}>
                  Name
                </th>
                <th style={{ color: "#000000" }}>Height</th>
                <th style={{ color: "#000000" }}>Mass</th>
                <th style={{ color: "#000000" }}>Hair Color</th>
                <th style={{ color: "#000000" }}>Skin Color</th>
                <th style={{ color: "#000000" }}>Eye Color</th>
                <th style={{ color: "#000000" }}>Birth Year</th>
                <th style={{ color: "#000000" }}>Gender</th>
                <th style={{ color: "#000000", borderTopRightRadius: "10px" }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    style={{ textAlign: "center", padding: "20px" }}
                  >
                    <Text fz="xl" color="#5203fc">
                      No Data Found!
                    </Text>
                  </td>
                </tr>
              ) : (
                filteredData.map((resident, index) => (
                  <tr key={index}>
                    <td>{resident.name}</td>
                    <td>{resident.height}</td>
                    <td>{resident.mass}</td>
                    <td>{resident.hair_color}</td>
                    <td>{resident.skin_color}</td>
                    <td>{resident.eye_color}</td>
                    <td>{resident.birth_year}</td>
                    <td>{resident.gender}</td>
                    <td>
                      <Group spacing={"sm"}>
                        {/* <Link to={`/residents/${resident.id}`} style={{ marginTop: "7px" }}>
                          <Tooltip label="View" sx={{ fontSize: "13px" }}>
                            <IconEye color="#5203fc" />
                          </Tooltip>
                        </Link> */}
                        <Tooltip
                          label="Edit"
                          sx={{ fontSize: "13px" }}
                          onClick={() => {
                            setEditingResident(resident);
                            setResidentData(resident);
                            setModalOpen(true);
                          }}
                          transitionProps={{
                            transition: "skew-up",
                            duration: 300,
                          }}
                        >
                          <IconEdit
                            style={{ cursor: "pointer" }}
                            color="#5203fc"
                          />
                        </Tooltip>
                      </Group>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
      </main>

      <Modal
        opened={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setResidentData(initialData);
        }}
        title={editingResident ? "Edit Resident" : "Create Resident"}
        centered
      >
        <Stack p={10}>
          <Input
            placeholder="Name"
            value={residentData.name}
            onChange={(e) =>
              setResidentData({ ...residentData, name: e.target.value })
            }
          />
          <Input
            placeholder="Height"
            value={residentData.height}
            onChange={(e) =>
              setResidentData({ ...residentData, height: e.target.value })
            }
          />
          <Input
            placeholder="Mass"
            value={residentData.mass}
            onChange={(e) =>
              setResidentData({ ...residentData, mass: e.target.value })
            }
          />
          <Input
            placeholder="Hair Color"
            value={residentData.hair_color}
            onChange={(e) =>
              setResidentData({ ...residentData, hair_color: e.target.value })
            }
          />
          <Input
            placeholder="Skin Color"
            value={residentData.skin_color}
            onChange={(e) =>
              setResidentData({ ...residentData, skin_color: e.target.value })
            }
          />
          <Input
            placeholder="Eye Color"
            value={residentData.eye_color}
            onChange={(e) =>
              setResidentData({ ...residentData, eye_color: e.target.value })
            }
          />
          <Input
            placeholder="Birth Year"
            value={residentData.birth_year}
            onChange={(e) =>
              setResidentData({ ...residentData, birth_year: e.target.value })
            }
          />
          <Select
            data={["male", "female", "n/a"]}
            value={residentData.gender}
            onChange={(value) =>
              setResidentData({ ...residentData, gender: value || "" })
            }
            placeholder="Gender"
            styles={{
              input: {
                backgroundColor: "transparent",
                borderRadius: "4px !important",
              },
            }}
          />
          <Button fullWidth mt="md" onClick={handleSaveResident}>
            {editingResident ? "Update" : "Create"}
          </Button>
        </Stack>
      </Modal>
    </>
  );
};

export default Residents;
