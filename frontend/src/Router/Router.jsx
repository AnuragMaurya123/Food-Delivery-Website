import { createBrowserRouter } from "react-router-dom";

import Main from "../layout/Main";
import Home from "../pages/home/Home";
import App from "../App";

const router=createBrowserRouter([
    {
        path:"/",
        element:<Main/>,
        children:[
            {
                path:"/",
                element:<App/>,
            }
        ]
    }
    

])

export default router
