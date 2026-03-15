import React from "react";
import Navbar from "../../components/layout/Navbar/Navbar";
import Footer from "../../components/layout/Footer/Footer";
import Hero from "../../components/landing/Hero";
import ScrollingTransition from "../../components/landing/ScrollingTransition";
import MatchInfo from "../../components/landing/MatchInfo";
import MemberFeature from "../../components/landing/MemberFeature";
import WhyUs from "../../components/landing/WhyUs";
import LoveStory from "../../components/landing/LoveStory";
import PremiumMember from "../../components/landing/PremiumMember";
import OurStoryWaitingForU from "../../components/landing/OurStoryWaitingForU";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ScrollingTransition />
      <MatchInfo />
      <MemberFeature />
      <WhyUs />
      <LoveStory />
      <PremiumMember />
      <OurStoryWaitingForU />
      <Footer />
    </>
  );
}

export default Home;
