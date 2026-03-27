import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

const MOCK_USERS = [
  {
    username: 'dev',
    password: '1234',
    role: 'desarrollador',
    nombre: 'Desarrollador'
  },
  {
    username: 'cliente',
    password: '1234',
    role: 'cliente',
    nombre: 'Cliente'
  }
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('cl2_user');
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  const login = (username, password) => {
    const foundUser = MOCK_USERS.find(
      (u) => u.username === username && u.password === password
    );

    if (!foundUser) {
      return { ok: false, message: 'Usuario o clave incorrectos.' };
    }

    const safeUser = {
      username: foundUser.username,
      role: foundUser.role,
      nombre: foundUser.nombre
    };

    localStorage.setItem('cl2_user', JSON.stringify(safeUser));
    setUser(safeUser);

    return { ok: true, user: safeUser };
  };

  const logout = () => {
    localStorage.removeItem('cl2_user');
    setUser(null);
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}