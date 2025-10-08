import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Layout from "../components/layout/Layout";
import Home from "../components/home/Home";
import Watch from "../components/watch/Watch";
import GptBrowser from "../components/gpt/GptBrowser";

const AppRouter = () => {
    const router = createBrowserRouter(createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="watch" element={<Watch />} />
            <Route path="gptBrowser" element={<GptBrowser />} />
        </Route>
    ))

  return <RouterProvider router={router} />
}

export default AppRouter