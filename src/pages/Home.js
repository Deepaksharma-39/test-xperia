import React from "react";
import HomeLayout from "../Layout/HomeLayout";
import MovingServices from "../sections/home/MovingServices";
import DualBanner from "../sections/home/DualBanner";

const Home = () => {
  return (
    <HomeLayout>
      <div
        data-elementor-type="wp-page"
        data-elementor-id="1255"
        className="elementor elementor-1255"
      >
        <DualBanner />
        <MovingServices />
      </div>
    </HomeLayout>
  );
};

export default Home;
