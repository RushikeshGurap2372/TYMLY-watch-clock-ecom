import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AccountPage = () => {
  const { user, logout } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-24 p-6 bg-white shadow">
        <h2 className="text-xl">Not signed in</h2>
        <p>Please sign in to view your account.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-24 p-6 bg-white shadow">
      <h2 className="text-2xl mb-4">Welcome, {user.name || user.email}</h2>
      <p className="mb-4">Email: {user.email}</p>
      <button onClick={logout} className="bg-red-500 text-white p-2">
        Sign out
      </button>
    </div>
  );
};

export default AccountPage;
