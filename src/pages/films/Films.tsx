import React, { useState } from "react";
import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Container,
  SimpleGrid,
  Title,
  Tooltip,
} from "@mantine/core";
import { useFetchFilms, useAppStore } from "../../store/app.store";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { randomStarships } from "../../store/staticData";
import CommonLoader from "../../components/Loader";

const FilmsList = () => {
  const { data, isLoading, isError } = useFetchFilms();
  const navigate = useNavigate();

  const { favourites, addFavourite, removeFavourite } = useAppStore();

  const [showFavourites, setShowFavourites] = useState(false);

  if (!data) return null;

  if (isError) {
    return (
      <Container>
        <Text color="red">Failed to load films. Try again later.</Text>
      </Container>
    );
  }

  const sortedFilms = [...data].sort((a, b) => a.episode_id - b.episode_id);

  const toggleFavourite = (episodeId: number) => {
    if (favourites.includes(episodeId)) {
      removeFavourite(episodeId);
    } else {
      addFavourite(episodeId);
    }
  };

  const filteredFilms = showFavourites
    ? sortedFilms.filter((film) => favourites.includes(film.episode_id))
    : sortedFilms;

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
        <div>
          <Group
            position="apart"
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
            <div>
              <Title order={2} align="left">
                {showFavourites ? "Favourite Films" : "Star Wars Films"}
              </Title>
              <Text fz="sm">Total: {filteredFilms.length}</Text>
            </div>
            <Button
              variant="gradient"
              gradient={{ from: "#5203fc", to: "#5203fc" }}
              onClick={() => setShowFavourites(!showFavourites)}
              sx={{
                "@media (max-width: 400px)": {
                  width: "100%",
                },
              }}
            >
              {showFavourites ? "Show All" : "See Favourites"}
            </Button>
          </Group>
          {isLoading ? (
            <CommonLoader />
          ) : (
            <SimpleGrid
              mt={"xl"}
              cols={1}
              spacing="xl"
              breakpoints={[
                { minWidth: 768, cols: 2 },
                { minWidth: 1024, cols: 3 },
              ]}
            >
              {filteredFilms.map((film, index) => (
                <Card
                  key={film.episode_id}
                  shadow="sm"
                  padding="lg"
                  radius="md"
                  withBorder
                >
                  <Card.Section>
                    <Image
                      src={randomStarships[index + 1]}
                      height={160}
                      alt={film.title}
                    />
                  </Card.Section>

                  <Group position="apart" mt="md" mb="xs">
                    <Text weight={500} color="#5203fc">
                      {film.title}
                    </Text>
                    <Badge color="yellow" variant="light">
                      Episode {film.episode_id}
                    </Badge>
                  </Group>
                  <Group position="left" mt="md" mb="xs">
                    <Text size="sm" color="dimmed">
                      Directed by:
                    </Text>
                    <Text size="sm" color="">
                      {film.director}
                    </Text>
                  </Group>
                  <Group position="left" mt="xs" mb="xs">
                    <Text size="sm" color="dimmed">
                      Released on:
                    </Text>
                    <Text size="sm" color="">
                      {film.release_date}
                    </Text>
                  </Group>
                  <Group position="apart" mt="md" mb="xs">
                    <Button
                      variant="light"
                      color="green"
                      mt="md"
                      radius="md"
                      onClick={() => navigate(`/films/${index + 1}`)}
                    >
                      View Details
                    </Button>
                    {favourites.includes(film.episode_id) ? (
                      <Tooltip
                        transitionProps={{
                          transition: "skew-up",
                          duration: 300,
                        }}
                        label="Remove from favourites"
                        sx={{ fontSize: "13px" }}
                      >
                        <IconHeartFilled
                          style={{
                            marginTop: "15px",
                            cursor: "pointer",
                            color: "red",
                          }}
                          onClick={() => toggleFavourite(film.episode_id)}
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip
                        transitionProps={{
                          transition: "skew-up",
                          duration: 300,
                        }}
                        label="Add to favourites"
                        sx={{ fontSize: "13px" }}
                      >
                        <IconHeart
                          style={{ marginTop: "15px", cursor: "pointer" }}
                          onClick={() => toggleFavourite(film.episode_id)}
                        />
                      </Tooltip>
                    )}
                  </Group>
                </Card>
              ))}
            </SimpleGrid>
          )}
        </div>
      </main>
    </>
  );
};

export default FilmsList;
