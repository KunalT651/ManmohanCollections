import { create } from 'zustand';

interface User {
  _id: string;
  name: string;
  email: string;
  token: string;
}

interface AuthState {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  register: (user: User) => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || 'null') : null,
  login: (user) => {
    set({ user });
    localStorage.setItem('user', JSON.stringify(user));
  },
  logout: () => {
    set({ user: null });
    localStorage.removeItem('user');
  },
  register: (user) => {
    set({ user });
    localStorage.setItem('user', JSON.stringify(user));
  },
})); 