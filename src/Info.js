import React, { useState, useEffect } from "react";
import { useMyContext } from "./MyContext";

const Info = ({ ...props }) => {
  const { globalState, setGlobalState } = useMyContext();

  console.log(globalState);
  //     const [data, setData] = useState([]);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await fetch('./data.json'); // Assuming data.json is in the src folder
  //         const jsonData = await response.json();
  //         setData(jsonData);
  //       } catch (error) {
  //         console.error('Error fetching data:', error);
  //       }
  //     };

  //     fetchData();
  //   }, []);
  const openNewTab = () => {
    const linkToOpen = globalState.show.url; // Replace with your desired link
    const newTab = window.open(linkToOpen, "_blank");
    if (newTab) {
      newTab.opener = null; // Disassociate the new tab from the current page to avoid pop-up blockers
    } else {
      console.error("Pop-up blocked. Please allow pop-ups for this site.");
    }
  };

  const summ = globalState.show.summary.substring(
    3,
    globalState.show.summary.length - 4
  );
  return (
    <div className="bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFR-LWh9fmtCfiEQjlCgicippSwxossXwSbw&usqp=CAU')] h-full p-1">
      <div className=" flex justify-center">
        <h1 className="text-blue-200 rounded-xl font-bold text-6xl p-5 bg-black mb-4 mt-5">
          QuadB-Tech
        </h1>
      </div>
      <div className="show-card bg-gray-300 p-6 rounded-xl shadow-md mb-8 flex flex-row text-xl mx-8 border-4 border-blue-800">
        <div>
          <img
            alt="hello"
            src={globalState.show.image ? globalState.show.image.medium : null}
            className="w-48 h-48  rounded-md mb-4 mr-32 ml-8  border-2 border-black"
          />
        </div>
        <div className="ml-24">
          <h2 className="text-3xl font-bold mb-4">{globalState.show.name}</h2>
          <p className="text-gray-700 mb-4">
            Rating: {globalState.show.rating.average}{" "}
          </p>{" "}
          <p className="text-gray-700 mb-4">
            Language: {globalState.show.language}{" "}
          </p>
          <p className="text-gray-700 mb-4">
            Genre:{" "}
            {globalState.show.genres.map((e) => {
              return <span className="ml-2">{e}</span>;
            })}{" "}
          </p>
          <p className="text-gray-700 mb-4">
            Status: {globalState.show.status}
          </p>
          <p className="text-gray-700 mb-4 ">
            Summary: {summ.replace(/<\/?b>/g, "")}
          </p>
          <p className="text-gray-700 mb-4">
            Country :{" "}
            {globalState.show.network.country
              ? globalState.show.network.country.name
              : null}
          </p>
          <p className="text-gray-700 mb-4">Runtime: {globalState.show.name}</p>
          <p className="text-gray-700 mb-4">
            Start Date - End Date: {globalState.show.name}
          </p>
          <p className="text-gray-700 mb-4">
            Days and Timing: {globalState.show.name}
          </p>
          <p className="text-gray-700 mb-4">Network: {globalState.show.name}</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            onClick={openNewTab}
          >
            Watch Now
          </button>
        </div>
      </div>
    </div>
  );
};
export default Info;
