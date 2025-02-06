import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useQuery } from "@tanstack/react-query";

// ✅ Fake JWT token utility
const generateFakeJwt = (email: string) => {
  const header = { alg: "HS256", typ: "JWT" };
  const payload = { email, exp: Date.now() + 3600000 }; // 1-hour expiration
  const base64Encode = (obj: any) => btoa(JSON.stringify(obj)); // Base64 encoding
  return `${base64Encode(header)}.${base64Encode(payload)}`;
};

// ✅ Auth Store (Persisting Login State)
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
          email: "admin@example.com",
          password: "admin123",
        };
        if (
          email === hardcodedUser.email &&
          password === hardcodedUser.password
        ) {
          const token = generateFakeJwt(email);
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

// ✅ Interfaces
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

// ✅ App Store (Persisting Favourites & People)
interface AppState {
  users: UserData[];
  planets: PlanetData[];
  films: FilmData[];
  favourites: number[];
  people: PeopleData[];
  setUsers: (users: UserData[]) => void;
  setPlanets: (planets: PlanetData[]) => void;
  setFilms: (films: FilmData[]) => void;
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
      users: [],
      planets: [],
      films: [],
      favourites: [],
      people: [],

      setUsers: (users) => set({ users }),
      setPlanets: (planets) => set({ planets }),
      setFilms: (films) => set({ films }),

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
          users: [],
          planets: [],
          films: [],
          favourites: [],
          people: [],
        });
      },
    }),
    { name: "app-storage" }
  )
);

// ✅ Fetch API Functions
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

const fetchPersonById = async (id: number): Promise<PeopleData> => {
  const response = await fetch(`https://swapi.dev/api/people/${id}`);
  if (!response.ok) throw new Error("Failed to fetch person details");
  return response.json();
};

// ✅ Custom Hooks to Fetch & Store Data
export const useFetchUsers = () => {
  const setUsers = useAppStore((state) => state.setUsers);
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    onSuccess: setUsers,
  });
};

export const useFetchPlanets = () => {
  const setPlanets = useAppStore((state) => state.setPlanets);
  return useQuery({
    queryKey: ["planets"],
    queryFn: fetchPlanets,
    onSuccess: setPlanets,
  });
};

export const useFetchFilms = () => {
  const setFilms = useAppStore((state) => state.setFilms);
  return useQuery({
    queryKey: ["films"],
    queryFn: fetchFilms,
    onSuccess: setFilms,
  });
};

export const useFetchPeople = () => {
  const setPeople = useAppStore((state) => state.setPeople);
  return useQuery({
    queryKey: ["people"],
    queryFn: fetchPeople,
    onSuccess: setPeople,
  });
};

export const useFetchPersonById = (id: number) => {
  return useQuery({
    queryKey: ["person", id],
    queryFn: () => fetchPersonById(id),
  });
};
