import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes"; // Import router file



const App = () => {

  return <RouterProvider router={router} />;

};

export default App;
