import { useEffect } from "react";
import Cards from "../../modules/Cards";
import styles from "../../modules/css/header.module.css";
import EventDetail from "../../modules/EventDetail";
import Organizer from "../../modules/Organizer";
import Location from "../../modules/Location";
import FeaturedTabs from "../../modules/featured-Tabs";
export default function UpcomingEvents() {
  useEffect(()=>{
    document.getElementById("header").classList.add(styles["fixed-header"]);
  })
  return (
    <>
      <div className={`container bg-white p-5 rounded-20`}>
        <EventDetail title="Book"></EventDetail>
        <div className="d-flex d-flex-wrap">
          <div className="col-6">
            <Organizer></Organizer>
          </div>
          <div className="offset-1 col-5">
            <Location></Location>
          </div>
          <FeaturedTabs classes="large "></FeaturedTabs>
        </div>
      </div>
      <div className="container mt-75">
      <div className="col-12">
          <h2 className="mb-4 letter-spacing-3 f-700 l-40 text-gradient">Past Events</h2>
        </div>
        <Cards></Cards>
      </div>
      
    </>
  )
}
