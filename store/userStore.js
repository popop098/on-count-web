import { useEffect, useState } from "react";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

const useUserStore = create(
  subscribeWithSelector((set, get) => ({
    user: null,
    isLoading: false,
    setUser: (user) => set({ user, isLoading: false }),
    clearUser: () => set({ user: null, isLoading: false }),
    setLoading: (isLoading) => set({ isLoading }),
  }))
);

export const useUser = () => {
  const user = useUserStore((state) => state.user);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? user : null;
};

export const useUserLoading = () => {
  const [isClient, setIsClient] = useState(false);
  const isLoading = useUserStore((state) => state.isLoading);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? isLoading : false;
};

export default useUserStore;
