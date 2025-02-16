import React, { useState, useMemo } from "react";
import { useQuery, useQueries } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  Container,
  Text,
  Title,
  Tabs,
  List,
  Breadcrumbs,
  Anchor,
  Card,
  Grid,
} from "@mantine/core";
import Navbar from "../../components/Navbar";
import CommonLoader from "../../components/CommonLoader";
import { ramdomCharacters, randomStarships } from "../../store/staticData";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

interface Film {
  episode_id: number;
  title: string;
  director: string;
  producer: string;
  release_date: string;
  opening_crawl: string;
  characters: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
}

const fetchFilm = async (id: string): Promise<Film> => {
  const response = await fetch(`https://swapi.dev/api/films/${id}/`);
  if (!response.ok) throw new Error("Failed to fetch film");
  return response.json();
};

const fetchMultiple = async (urls: string[]) => {
  if (!urls?.length) return [];
  const responses = await Promise.all(urls.map((url) => fetch(url)));
  return Promise.all(responses.map((res) => res.json()));
};

const FilmsView = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<string>("characters");

  const { data, isLoading, isError } = useQuery<Film>({
    queryKey: ["film", id],
    queryFn: () => fetchFilm(id!),
    enabled: !!id,
  });

  const results = useQueries({
    queries: (data
      ? ["characters", "starships", "vehicles", "species"].map((key) => ({
          queryKey: [key, data[key as keyof Film]],
          queryFn: () => fetchMultiple(data[key as keyof Film] as string[]),
          enabled: !!(data[key as keyof Film] as string[])?.length,
        }))
      : []) as {
      queryKey: (string | number | string[])[];
      queryFn: () => Promise<any[]>;
      enabled: boolean;
    }[],
  });

  const [characters, starships, vehicles, species] = useMemo(
    () => results.map((result) => result?.data || []),
    [results]
  );

  if (isLoading) return <CommonLoader />;

  if (isError || !data) {
    return (
      <Container>
        <Text color="red">Error loading film details</Text>
      </Container>
    );
  }

  const crumbLinks = [
    { title: "Films List", href: "/films" },
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
        {
          <div>
            <Title order={2} align="center" mb="lg" mt={"lg"}>
              {data.title} (Episode {data.episode_id})
            </Title>
            <Text align="center" size="sm" color="dimmed">
              Directed by {data.director} | Produced by {data.producer} |
              Released on {data.release_date}
            </Text>
            <Grid gutter="xl" mt={30}>
              <Grid.Col xs={12} md={4}>
                <Card shadow="md" p="lg" radius="md" bg={"#f1f1f1"}>
                  <Title order={4} align="center" mb="lg">
                    Opening Crawl
                  </Title>
                  <Text size="sm" color="dimmed">
                    {data.opening_crawl}
                  </Text>
                </Card>
              </Grid.Col>
              <Grid.Col xs={12} md={8}>
                <Tabs
                  value={activeTab}
                  onTabChange={(value) => setActiveTab(value!)}
                >
                  <div
                    style={{
                      overflowX: "auto",
                      whiteSpace: "nowrap",
                      scrollbarWidth: "none",
                      WebkitOverflowScrolling: "touch",
                    }}
                  >
                    <Tabs.List
                      style={{ display: "flex", minWidth: "max-content" }}
                    >
                      <Tabs.Tab px={40} py={10} value="characters">
                        Characters
                      </Tabs.Tab>
                      <Tabs.Tab px={40} py={10} value="starships">
                        Starships
                      </Tabs.Tab>
                      <Tabs.Tab px={40} py={10} value="vehicles">
                        Vehicles
                      </Tabs.Tab>
                      <Tabs.Tab px={40} py={10} value="species">
                        Species
                      </Tabs.Tab>
                    </Tabs.List>
                  </div>

                  <Tabs.Panel value="characters">
                    {results[0]?.isLoading ? (
                      <CommonLoader />
                    ) : (
                      <Grid gutter="xl" mt={20}>
                        {characters?.map((char, index) => (
                          <Grid.Col xs={12} md={3} key={index}>
                            <Card shadow="sm" p={0}>
                              <LazyLoadImage
                                src={
                                  ramdomCharacters[
                                    index % ramdomCharacters.length
                                  ]
                                }
                                width={"100%"}
                                height={160}
                                alt={char.name}
                                effect="blur"
                                style={{
                                  objectFit: "cover",
                                  objectPosition: "center",
                                }}
                              />
                              <Text
                                mt={5}
                                size={"sm"}
                                align="center"
                                color="#5203fc"
                              >
                                {char.name}
                              </Text>
                            </Card>
                          </Grid.Col>
                        ))}
                      </Grid>
                    )}
                  </Tabs.Panel>

                  <Tabs.Panel value="starships">
                    {results[1]?.isLoading ? (
                      <CommonLoader />
                    ) : (
                      <Grid gutter="xl" mt={20}>
                        {starships?.map((ship, index) => (
                          <Grid.Col xs={12} md={3} key={index}>
                            <Card shadow="sm" p={0}>
                              <LazyLoadImage
                                src={
                                  randomStarships[
                                    index % randomStarships.length
                                  ]
                                }
                                width={"100%"}
                                height={160}
                                alt={ship.name}
                                effect="blur"
                                style={{
                                  objectFit: "cover",
                                  objectPosition: "center",
                                }}
                              />
                              <Text
                                mt={5}
                                size={"sm"}
                                align="center"
                                color="#5203fc"
                              >
                                {ship.name}
                              </Text>
                            </Card>
                          </Grid.Col>
                        ))}
                      </Grid>
                    )}
                  </Tabs.Panel>

                  <Tabs.Panel value="vehicles">
                    {results[2]?.isLoading ? (
                      <CommonLoader />
                    ) : (
                      <List spacing="sm" mt="md">
                        {vehicles?.map((vehicle) => (
                          <List.Item key={vehicle.name}>
                            {vehicle.name}
                          </List.Item>
                        ))}
                      </List>
                    )}
                  </Tabs.Panel>

                  <Tabs.Panel value="species">
                    {results[3]?.isLoading ? (
                      <CommonLoader />
                    ) : (
                      <List spacing="sm" mt="md">
                        {species?.map((specie) => (
                          <List.Item key={specie.name}>{specie.name}</List.Item>
                        ))}
                      </List>
                    )}
                  </Tabs.Panel>
                </Tabs>
              </Grid.Col>
            </Grid>
          </div>
        }
      </main>
    </>
  );
};

export default FilmsView;
