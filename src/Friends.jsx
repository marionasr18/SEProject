import React, { useState, useCallback, useEffect, useContext } from "react";
import { FetchData } from "./functions";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { LoadingContext } from "./LoadingContextWrapper";
import NavigationBar from "./NavigationBar";

const Friends = () => {
  const STATE = {
    playersList: [],
  };
  const [state, setState] = useState(STATE);

<<<<<<< HEAD
  const FillData = useCallback(async () => {
    let data = await FetchData("DataFiles/PlayersData.json", "get");
    setState((prv) => {
      return {
        ...prv,
        playersList: data.data,
      };
    });
    console.log(data.data);
  }, []);
  useEffect(() => {
    FillData();
  }, []);

  const drawCards = useCallback(() => {
    return state.playersList.map((e) => {
      return (
        <>
          <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-end px-4 pt-4">
              {/* <button id="dropdownButton" data-dropdown-toggle="dropdown" className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
=======
    const STATE = {
        playersList: [],
        playersListNotFiltered: [],
    }
    const [state, setState] = useState(STATE)

    const FillData = useCallback(async () => {
        let data = await FetchData('DataFiles/PlayersData.json', 'get')
        setState(prv => {
            return {
                ...prv,
                // playersList:data.data,
                playersListNotFiltered: data.data,
            }
        })
    }, [])
    useEffect(() => {
        FillData()
    }, [])

    const drawCards = useCallback(() => {
        return state.playersList.map(e => {
            return (
                <>
                    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex justify-end px-4 pt-4">
                            {/* <button id="dropdownButton" data-dropdown-toggle="dropdown" className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
>>>>>>> ae56e3f71c1d075beb280b443e1b5d72aa4197c4
                    <span className="sr-only">Open dropdown</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path></svg>
                </button>
                <div id="dropdown" className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                    <ul className="py-2" aria-labelledby="dropdownButton">
                    <li>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Export Data</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
                    </li>
                    </ul>
                </div> */}
<<<<<<< HEAD
            </div>
            <div className="flex flex-col items-center pb-10">
              <img
                className="w-24 h-24  rounded-full shadow-lg"
                src={e.image}
                alt="No img"
              />
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {e.first_name + " " + e.last_name}{" "}
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {e.position}
              </span>
              <div className="flex mt-4 space-x-3 md:mt-6">
                <a
                  href="#"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add friend
                </a>
                <a
                  href="#"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                >
                  Message
                </a>
              </div>
            </div>
          </div>
        </>
      );
    });
  }, [state.playersList]);
  const handleChange = useCallback(() => {}, []);
  return (
    <>
      <NavigationBar />
      <div className="row mt-4 ml-4">
        In this page you can connect and contact your friends
      </div>
      <div className="row mt-3">
        <div className="col-2 ml-5">Search </div>
        <div className="col-5">
          {" "}
          <input
            type="text"
            className="form-control"
            value={state.fieldsCode}
            name="fieldsCode"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row mt-4">{drawCards()}</div>
    </>
  );
};
export default Friends;
=======
                        </div>
                        <div className="flex flex-col items-center pb-10">
                            <img className="w-24 h-24  rounded-full shadow-lg" src={e.image} alt="No img" />
                            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{e.first_name + ' ' + e.last_name} </h5>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{e.position}</span>
                            <div className="flex mt-4 space-x-3 md:mt-6">
                                <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add friend</a>
                                <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Message</a>
                            </div>
                        </div>
                    </div>
                </>)
        })
    }, [state.playersList])
    const handleChange = useCallback((e) => {
        let value = e.target.value

        setState(prv => {
            let filteredPlayers = prv.playersListNotFiltered.filter(e => e.first_name === value || e.last_name === value)
            return {
                ...prv,
                playersList: filteredPlayers
            }
        })

    }, [])
    return (
        <>
            <NavigationBar />
            <div className="row mt-4 ml-4">In this page you can connect and contact your friends</div>
            <div className="row mt-3">
                <div className="col-2 ml-5">Search </div>
                <div className="col-5"> <input type="text" className="form-control" value={state.fieldsCode} name="fieldsCode" onBlur={handleChange} /></div>
            </div>
            <div className="row mt-4">
                {drawCards()}
            </div>
        </>

    )
}
export default Friends;
>>>>>>> ae56e3f71c1d075beb280b443e1b5d72aa4197c4
