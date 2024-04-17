import './App.css'
import IndexPage from "./pages/IndexPage/index.jsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ViewingPage from "./pages/ViewingPage/index.jsx";
import NavBar from "./components/NavBar/index.jsx";
import IndexLayout from "./components/IndexLayout/index.jsx";

function App() {

    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <IndexLayout>
                    <IndexPage/>
                </IndexLayout>
            ),
        },
        {
            path: "/room/:id",
            element: (
                <IndexLayout>
                    <ViewingPage/>
                </IndexLayout>
            ),
        },
    ]);
    return (
        <RouterProvider router={router}/>
    )
}

export default App
