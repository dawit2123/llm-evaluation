import React, { createContext, useState, ReactNode, useContext } from "react";

// Define the shape of the context
interface MyContextType {
  user: string | null;
  setUser: (newUser: string | null) => void;
}

// Create the context
const MyContext = createContext<MyContextType | undefined>(undefined);

// Export a custom hook to access the context
export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyProvider");
  }
  return context;
};

// Create the provider component
export const MyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);

  return (
    <MyContext.Provider value={{ user, setUser }}>
      {children}
    </MyContext.Provider>
  );
};
