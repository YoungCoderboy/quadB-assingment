import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import axios, { all } from "axios";
import Loader from "./component/Loader";
import Stars from "./component/Stars";
import Info from "./Info";
import { useMyContext } from "./MyContext";

function Lp() {
  const url = "https://api.tvmaze.com/search/shows?q=all";
  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState(["All"]);
  const [currGen, setCurrGen] = useState("All");
  const { globalState, setGlobalState } = useMyContext();

  const getFeeds = async () => {
    try {
      const response = await axios.get(url);
      const result = response.data;
      // console.log(result);
      setData(result);
      // Data.slice(20);
      // console.log(Data);
      setLoading(false);
    } catch (error) {
      setLoading(true);
      console.error(error);
    }
  };

  const findData = (id) => {
    const data = Data.filter((ele) => {
      return ele.show.id == id;
    });

    setGlobalState(data[0]);
  };

  useEffect(() => {
    getFeeds();
  }, []);
  useEffect(() => {
    let allGenera = Data.map((item) => {
      return item.show.genres.map((element) => {
        return element;
      });
    });
    allGenera = allGenera.flat(1);

    // console.log(allGenera);
    const setOfGenera = new Set(allGenera);
    setOfGenera.add("All");
    // setOfGenera.sort();
    setGenres([...setOfGenera]);
  }, [Data]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("All"); // Default to show all ministries
  // Default to no sorting
  const itemsPerPage = 5;

  // Apply filters based on search, ministry, and sentiment
  const filteredData = Data.filter((item) => {
    return (
      item.show.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (status === "All" || item.show.status === status) &&
      (currGen === "All" || item.show.genres.includes(currGen))
    );
  });

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Ensure currentPage is within a valid range
  const validPage = Math.min(Math.max(currentPage, 1), totalPages);

  // Calculate the index of the first and last items to display on the current page
  const indexOfLastItem = validPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle page changes
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="App bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFR-LWh9fmtCfiEQjlCgicippSwxossXwSbw&usqp=CAU')] h-full pt-7">
      <div className=" flex justify-center">
        <h1 className="text-blue-200 rounded-xl font-bold text-6xl p-5 bg-black mb-4">
          QuadB-Tech
        </h1>
      </div>
      <div className="mb-4 ml-8">
        <input
          type="text"
          placeholder="Search movie show..."
          className="px-2 py-1  rounded border-2 border-black"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="text-black text-xl rounded-md p-1 font-bold ml-4 bg-white border-2 border-black">
          Status :
        </span>
        <select
          className="ml-4 px-2 py-1 border rounded border-2 border-black"
          value={status}
          placeholder="Status"
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Running">Running</option>
          {/* Replace with actual ministries */}
          <option value="Ended">Ended</option>
          <option value="In Development">In Development</option>
          {/* Add more ministries here */}
        </select>
        <span className="text-black text-xl rounded-md p-1 font-bold ml-4 bg-white border-2 border-black">
          Genre :
        </span>
        <select
          className="ml-4 px-2 py-1 border rounded border-2 border-black"
          value={currGen}
          onChange={(e) => setCurrGen(e.target.value)}
        >
          {genres.map((item) => {
            return <option value={item}>{item}</option>;
          })}
        </select>
      </div>
      {currentItems.map((item) => (
        <div
          key={item.id}
          className="bg-gray-200 p-4 rounded-xl shadow-md flex space-x-4 border-4 border-blue-800  mx-6 mb-7"
        >
          <img
            alt={item.show.name}
            src={item.show.image ? item.show.image.medium : null}
            className="w-60 h-52 rounded-lg border-4 border-red-800 mr-8"
          />
          <div className="w-3/4">
            <div className="grid grid-cols-2 gap-4">
              <h2 className="text-3xl font-semibold text-black mb-4">
                <Link to="/info" onClick={() => findData(item.show.id)}>
                  {item.show.name}
                </Link>
                <Routes>
                  <Route path="/info" render={(props) => <Info {...props} />} />
                </Routes>
              </h2>
              <div className="text-black text-xl text-right flex-end">
                {item.show.rating.average ? (
                  <div className="flex mr-auto">
                    <p className="p-1 text-2xl">Rating :</p>
                    <div className="flex">
                      <p className="p-1 mr-2 text-2xl">
                        {item.show.rating.average}
                      </p>

                      <BsStarFill className="fill-orange-300  mt-3" />
                    </div>
                  </div>
                ) : (
                  <div className="flex">
                    <p className="p-1  text-2xl">Rating :</p>
                    <div className="flex">
                      <p className="p-1 mr-2 text-2xl">
                        <b>?</b>
                      </p>

                      <BsStar className="fill-orange-300  mt-3" />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <p className="text-black text-xl mb-2 font-bold">
              {item.show.language}
            </p>
            <p className="text-black text-xl mb-2 font-bold">
              Genres:{" "}
              {item.show.genres.map((e) => {
                return <span className="m-2 font-normal">{e}</span>;
              })}
            </p>
            <p className="text-black text-xl mb-2">Score: {item.score}</p>
          </div>
        </div>
      ))}
      <div className="flex">
        <div className="text-white mr-8  pt-4 ml-8 text-xl">
          <h2 className="bg-gray-200 text-black rounded-lg p-2">Page no : </h2>
        </div>
        <div className="mt-4 ">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-2 mr-2 rounded ${
                validPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Lp;
