import React, { createContext, useCallback, useContext, useState } from 'react';

interface User {
  name: string;
  sobre: string;
}

interface AuthState {
  user: User;
}

interface AuthContextData {
  user: User;
  updateUser(user: User): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const user = localStorage.getItem('@AppUser:user');

    if (user) {
      return { user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const updateUser = useCallback(async (user: User) => {
    // localStorage.setItem('@AppUser:user', JSON.stringify(user));

    setData({ user });
  }, []);
  return (
    <AuthContext.Provider value={{ user: data.user, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
