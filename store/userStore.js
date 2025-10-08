import { useEffect, useState } from "react";
import { create } from "zustand";

const useUserStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));

export const useUser = () => {
  const user = useUserStore((state) => state.user);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? user : null;
};

export default useUserStore;
