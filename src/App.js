import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { Suspense } from "react"; // This is crucial
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchSettings } from "./redux/slice/settings-slice";

import { fetchProjects } from "./redux/slice/project-slice";
import { fetchServices } from "./redux/slice/service-slice";
import { fetchBanners } from "./redux/slice/banner-slice";
import { fetchBlogs } from "./redux/slice/blog-slice";
import { setLoading } from "./redux/slice/loading-slice";
import { fetchTeams } from "./redux/slice/team-slice";
import Home from "./pages/Home";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        dispatch(fetchSettings()),
        dispatch(fetchProjects()),
        dispatch(fetchServices()),
        dispatch(fetchBanners()),
        dispatch(fetchBlogs()),
        dispatch(fetchTeams()),
      ]);
      dispatch(setLoading(false));
    };

    fetchData();
  }, [dispatch]);

  // const Home = React.lazy(() => import("./pages/Home"));
  return (
    <>
      {
        <Suspense fallback={<div>Loading...</div>}>
          <BrowserRouter>
            <Routes>
              <Route path={"/"} element={<Home />} />
            </Routes>
          </BrowserRouter>
        </Suspense>
      }
    </>
  );
}

export default App;
