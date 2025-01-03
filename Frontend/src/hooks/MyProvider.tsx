import React, { createContext, useState } from "react";

interface UserContextType {
  email: string;
  isValidated: boolean;
}

interface MyContextType {
  user: UserContextType;
  setUser: React.Dispatch<React.SetStateAction<UserContextType>>;
}

export const MyContext = createContext<MyContextType>({
  user: { email: "", isValidated: false },
  setUser: () => {},
});

export const MyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserContextType>({
    email: "",
    isValidated: false,
  });

  return (
    <MyContext.Provider value={{ user, setUser }}>
      {children}
    </MyContext.Provider>
  );
};
