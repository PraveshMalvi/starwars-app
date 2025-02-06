import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useQuery } from "@tanstack/react-query";

interface User {
  email: string;
  token: string;
}

interface AuthState {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: async (email, password) => {
        const hardcodedUser = {
          email: "admin@starwars.com",
          password: "admin123",
        };
        if (
          email === hardcodedUser.email &&
          password === hardcodedUser.password
        ) {
          const token = btoa(email);
          set({ user: { email, token } });
          return true;
        }
        return false;
      },
      logout: () => set({ user: null }),
    }),
    { name: "auth-storage" }
  )
);

export interface UserData {
  id: number;
  name: string;
  email: string;
  company: { name: string };
  address: { city: string; geo: { lat: string; lng: string } };
}

export interface PlanetData {
  name: string;
  climate: string;
  terrain: string;
  orbital_period: string;
  population: string;
  rotation_period: string;
}

export interface FilmData {
  title: string;
  episode_id: number;
  director: string;
  release_date: string;
  opening_crawl: string;
}

export interface PeopleData {
  id?: number;
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
}

interface AppState {
  favourites: number[];
  people: PeopleData[];
  addFavourite: (id: number) => void;
  removeFavourite: (id: number) => void;
  setPeople: (people: PeopleData[]) => void;
  addPerson: (person: PeopleData) => void;
  updatePerson: (id: number, updatedPerson: PeopleData) => void;
  clearStorage: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      favourites: [],
      people: [],

      addFavourite: (id) =>
        set((state) => ({ favourites: [...state.favourites, id] })),
      removeFavourite: (id) =>
        set((state) => ({
          favourites: state.favourites.filter((fav) => fav !== id),
        })),

      setPeople: (people) => set({ people }),

      addPerson: (person) =>
        set((state) => ({
          people: [...state.people, { ...person, id: Date.now() }],
        })),

      updatePerson: (id, updatedPerson) =>
        set((state) => ({
          people: state.people.map((p) =>
            p.id === id ? { ...p, ...updatedPerson } : p
          ),
        })),

      clearStorage: () => {
        localStorage.removeItem("app-storage");
        set({
          favourites: [],
          people: [],
        });
      },
    }),
    { name: "app-storage" }
  )
);

const fetchUsers = async (): Promise<UserData[]> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!response.ok) throw new Error("Failed to fetch users");
  return response.json();
};

const fetchPlanets = async (): Promise<PlanetData[]> => {
  const response = await fetch("https://swapi.dev/api/planets");
  if (!response.ok) throw new Error("Failed to fetch planets");
  const data = await response.json();
  return data.results;
};

const fetchFilms = async (): Promise<FilmData[]> => {
  const response = await fetch("https://swapi.dev/api/films");
  if (!response.ok) throw new Error("Failed to fetch films");
  const data = await response.json();
  return data.results;
};

const fetchPeople = async (): Promise<PeopleData[]> => {
  const response = await fetch("https://swapi.dev/api/people");
  if (!response.ok) throw new Error("Failed to fetch people");
  const data = await response.json();
  return data.results.map((p: PeopleData, index: number) => ({
    id: index + 1,
    ...p,
  }));
};

export const useFetchUsers = () =>
  useQuery({ queryKey: ["users"], queryFn: fetchUsers });

export const useFetchPlanets = () =>
  useQuery({
    queryKey: ["planets"],
    queryFn: fetchPlanets,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

export const useFetchFilms = () =>
  useQuery({
    queryKey: ["films"],
    queryFn: fetchFilms,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

export const useFetchPeople = () => {
  const setPeople = useAppStore((state) => state.setPeople);
  return useQuery({
    queryKey: ["people"],
    queryFn: fetchPeople,
    onSuccess: setPeople,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
