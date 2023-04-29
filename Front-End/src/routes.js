import { Navigate, createBrowserRouter} from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import App from "./App";
import MedsDetails from "./pages/medsDetails/MedsDetails";
import ManageMeds from "./pages/manage-meds/ManageMeds";
import AddMeds from "./pages/manage-meds/AddMeds";
import UpdateMeds from "./pages/manage-meds/UpdateMeds";
import ManageCategoriesMeds from "./pages/manageCategoriesMeds/ManageCategoriesMeds";
import AddCategory from "./pages/manageCategoriesMeds/AddCategory";
import UpdateCategory from "./pages/manageCategoriesMeds/UpdateCategory";
import ManagePatients from "./pages/managePatients/ManagePatients";
import AddPatient from "./pages/managePatients/AddPatient";
import UpdatePatient from "./pages/managePatients/UpdatePatient";
import Request from "./pages/requestHistory/Request";
import History from "./pages/requestHistory/History";

export const routes = createBrowserRouter([
    {
        path: "",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            
            {
                path: ":id",
                element: <MedsDetails />,
            },

            {
                path: "/login",
                element: <Login />,
            },  

            {
                path: "/register",
                element: <Register />,
            },
            {
                path : "/requestHistory",
                children: [
                    {
                        path: "history",
                        element: <History />
                    },

                    {
                        path: "request",
                        element: <Request />
                    },
                ]
            },

            {
                path: "/manage-meds",
                children: [
                    {
                        path: "",
                        element: <ManageMeds />
                    },

                    {
                        path: 'add',
                        element: <AddMeds />
                    },
                    
                    {
                        path: ':id',
                        element: <UpdateMeds />
                    }
                ]
            },

            {
                path: "/manage-categories-meds",
                children: [
                    {
                        path: "",
                        element: <ManageCategoriesMeds />
                    },

                    {
                        path: 'add',
                        element: <AddCategory />
                    },
                    
                    {
                        path: ':id',
                        element: <UpdateCategory />
                    }
                ]
            },

            {
                path: "/managePatients",
                children: [
                    {
                        path: "",
                        element: <ManagePatients />
                    },

                    {
                        path: 'add',
                        element: <AddPatient />
                    },
                    
                    {
                        path: ':id',
                        element: <UpdatePatient />
                    }
                ]
            },
        ],
    },
    {
        path: "*",
        element: <Navigate to={"/"} />
    }
]);