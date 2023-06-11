import React from "react";
import {Route, Routes, useLocation} from "react-router-dom";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Profile from "./components/Profile";
import Convertation from "./components/Convertation";
import Request from "./components/Request";
import Navbar from "./components/Navbar"
import InnerTraids from "./components/InnerTraids";
import Dashboard from "./components/Dashboard";
import UserCreateRequest from "./components/UserCreateRequest";
import Archive from "./components/Archive";
import Order from "./components/Order";
import PaymentOrder from "./components/PaymentOrder";
import Report from "./components/Report";
import ClosingDocumentsCreate from "./components/ClosingDocuments/ClosingDocumentsCreate";
import ClosingDocumentsList from "./components/ClosingDocuments/ClosingDocumentsList";

const routes = [
    {path: "/", element: <Login/>},
    {path: "/profile", element: <Profile/>},
    {path: "/convertation", element: <Convertation/>},
    {path: "/request", element: <Request/>},
    {path: "/inner-traids", element: <InnerTraids/>},
    {path: "/dashboard", element: <Dashboard/>},
    {path: "/user-create-request", element: <UserCreateRequest/>},
    {path: "/archive", element: <Archive/>},
    {path: "/order", element: <Order/>},
    {path: "/payment-order", element: <PaymentOrder/>},
    {path: "/report", element: <Report/>},
    {path: "/closing-documents", element: <ClosingDocumentsCreate />},
    {path: "/closing-documents-list", element: <ClosingDocumentsList />},
    {path: "*", element: <NotFound/>},
]

const App = () => {
    const location = useLocation()

    return (
        <>
            {
                location.pathname !== "/" ? <Navbar /> : null
            }
            <div className="container">
                <Routes>
                    {
                        routes.map(item => (
                          <Route key={item.path} path={item.path} element={item.element}/>
                        ))
                    }
                </Routes>
            </div>
        </>
    );
};

export default App;
