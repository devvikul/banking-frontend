import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ManageBeneficiaries from "./components/managebeneficiaries/ManageBeneficiaries.jsx";
import BeneficiaryForm from "./components/beneficiaryform/BeneficiaryForm.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import "react-toastify/dist/ReactToastify.css";
import ViewBeneficiaryDetails from "./components/viewbeneficiarydetails/ViewBeneficiaryDetails.jsx";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/manageBeneficiaries",
    element: (
      <ManageBeneficiaries />
    ),
  },
  {
    path: "/manageBeneficiaries/baneficiariesform",
    element: (
      <BeneficiaryForm />
    ),
  },
  {
    path: "/manageBeneficiaries/viewbeneficiarydetails",
    element: <ViewBeneficiaryDetails />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
