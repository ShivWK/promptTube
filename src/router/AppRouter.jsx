import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Layout from "../components/layout/Layout";
import Home from "../components/home/Home";
import Watch from "../components/watch/Watch";
import GptBrowser from "../components/gpt/GptBrowser";
import SearchPage from "../components/search/SearchPage";
import searchLoader from "../components/search/searchLoader";

const AppRouter = () => {
    const router = createBrowserRouter(createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="watch" element={<Watch />} />
            <Route path="gptBrowser" element={<GptBrowser />} />
            <Route path="search" loader={searchLoader} element={<SearchPage />} />
        </Route>
    ))

  return <RouterProvider router={router} />
}

export default AppRouter