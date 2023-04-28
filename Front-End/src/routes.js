import { Navigate, createBrowserRouter} from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import App from "./App";
import MedsDetails from "./pages/MedsDetails/MedsDetails";
import ManageMeds from "./pages/manage-meds/ManageMeds";
import AddMeds from "./pages/manage-meds/AddMeds";
import UpdateMeds from "./pages/manage-meds/UpdateMeds";

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
        ],
    },
    {
        path: "*",
        element: <Navigate to={"/"} />
    }
]);