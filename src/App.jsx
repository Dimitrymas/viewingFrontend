import './App.css'
import IndexPage from "./pages/IndexPage/index.jsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ViewingPage from "./pages/ViewingPage/index.jsx";

function App() {

    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <IndexPage/>
            ),
        },
        {
            path: "/room/:id",
            element: (
                <ViewingPage/>
            ),
        },
    ]);
    return (
        <RouterProvider router={router}/>
    )
}

export default App
