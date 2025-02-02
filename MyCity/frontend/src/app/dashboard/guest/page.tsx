"use client";
import Navbar from "@/components/Navbar/Navbar";
import React, { Key, useEffect, useRef, useState } from "react";
import { Tabs, Tab } from "@nextui-org/react";
//import FaultCardContainer from "@/components/FaultCardContainer/FaultCardContainer";
import FaultTable from "@/components/FaultTable/FaultTable";
import FaultMapView from "@/components/FaultMapView/FaultMapView";
import { getMostUpvote } from "@/services/tickets.service";

export default function GuestDashboard() {
  const [dashMostUpvoteResults, setMostUpvoteResults] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rspmostupvotes = await getMostUpvote("");

        console.log(rspmostupvotes);
        // const flattenedWatchlist = rspwatchlist.flat();
        setMostUpvoteResults(rspmostupvotes);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleTabChange = (key: Key) => {
    const index = Number(key);
  };

  return (
    <div>
      {/* Desktop View */}
      <div className="hidden sm:block">
        <div>
          <Navbar />

          <main>
            <h1 className="text-4xl font-bold mb-2 mt-2 ml-2">Live Activity</h1>
            <h2 className="text-3xl font-bold mt-2 ml-2 text-blue-700">
              Guest
            </h2>
            <div className="flex flex-col items-center justify-center rounded-lg h-fit py-1">
              <Tabs
                aria-label="Signup Options"
                defaultSelectedKey={0}
                className="mt-5 flex justify-center w-full"
                classNames={{
                  tab: "min-w-32 min-h-10",
                  panel: "w-full",
                  cursor: "w-full bg-blue-200/20 border-3 border-blue-700/40",
                  tabContent:
                    "group-data-[selected=true]:font-bold group-data-[selected=true]:dop-shadow-md",
                }}
                onSelectionChange={handleTabChange}
              >
                <Tab key={0} title="Cards">
                  <h1 className="text-2xl font-bold mt-2 ml-2">
                    Most up-voted
                  </h1>
                  <h1 className="text-l mb-4 ml-2">
                    Based on votes from the community in your area.
                  </h1>
                 
                  <h1 className="text-2xl font-bold mt-2 ml-2">
                    Nearest to you
                  </h1>
                  <h1 className="text-l mb-4 ml-2">
                    Based on your proximity to the issue.
                  </h1>
                  
                </Tab>

                <Tab key={1} title="List">
                  <FaultTable tableitems={[]} />
                </Tab>

                <Tab key={2} title="Map">
                  <h1 className="text-4xl font-bold mb-4 mt-2 ml-2 text-center">
                    Faults
                  </h1>
                  <FaultMapView />
                </Tab>
              </Tabs>
            </div>
          </main>
        </div>
      </div>

      {/* Mobile View */}
      <div className="block sm:hidden">
        <div
          style={{
            position: "relative",
            height: "100vh",
            overflow: "hidden", // Prevents content overflow
          }}
        >
          <div className="text-white font-bold ms-2 transform hover:scale-105 mt-5 ml-5 transition-transform duration-200">
            <img
              src="https://i.imgur.com/WbMLivx.png"
              alt="MyCity"
              width={100}
              height={100}
              className="w-100 h-100"
            />
          </div>

          {/* Background image */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage:
                'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("https://www.andbeyond.com/wp-content/uploads/sites/5/Johannesburg-Skyline.jpg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              zIndex: -1, // Ensures the background is behind other content
            }}
          ></div>

          {/* Content */}
          <div className="h-[5vh] flex items-center justify-center"></div>
          <div className="container mx-auto relative z-10">
            {" "}
            {/* Ensure content is above the background */}
            <h1 className="text-4xl text-white font-bold mb-4 ml-4">
              <span className="text-blue-200">MyCity</span> <br />
              Under Construction
            </h1>
            <div className="text-white font-bold transform hover:scale-105 transition-transform duration-200 flex justify-center">
              <img
                src="https://i.imgur.com/eGeTTuo.png"
                alt="Under-Construction"
                width={300}
                height={300}
              />
            </div>
            <p className="text-lg text-gray-200 mb-4 ml-4">
              Our Mobile site is currently under construction.
              <br />
              Please use our Desktop site while we
              <br />
              work on it.
            </p>
          </div>
          <Tab key={1} title="List">
            <FaultTable tableitems={[]} />
          </Tab>
        </div>
      </div>
    </div>
  );
}
