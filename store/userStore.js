import { create } from 'zustand';
import { useEffect, useState } from 'react';

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
