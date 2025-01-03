import React, { useContext } from "react";
import { MyContext } from "../../hooks/MyProvider";

const Metrics: React.FC = () => {
  const { user } = useContext(MyContext);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold">
        Welcome, {user.email}! Your account is{" "}
        {user.isValidated ? "validated" : "not validated"}.
      </h1>
    </div>
  );
};

export default Metrics;
