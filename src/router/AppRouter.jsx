import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Layout from "../components/layout/Layout";
import Home from "../components/home/Home";
import Watch from "../components/watch/Watch";
import GptBrowser from "../components/ai/GptBrowser";
import SearchPage from "../components/search/SearchPage";
import VideoByCategory from "../components/home/VideoByCategory";
import Account from "../components/account/Account";
import authCheckLoader from "../components/account/authCheckLoader";
import Channel from "../components/subscribedChannels/Channel";
import RouterErrorBoundary from "../RouterErrorBoundary";

const AppRouter = () => {
    const router = createBrowserRouter(createRoutesFromElements(
        <Route path="/" element={<Layout />} errorElement={<RouterErrorBoundary />}>
            <Route index element={<Home />} />
            <Route path="watch" element={<Watch />} />
            <Route path="gptBrowser" element={<GptBrowser />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="category_videos" element={<VideoByCategory />} />
            <Route path="account" loader={authCheckLoader} element={<Account />} />
            <Route path="channel" element={<Channel />} />
        </Route>
    ))

  return <RouterProvider router={router} />
}

export default AppRouter