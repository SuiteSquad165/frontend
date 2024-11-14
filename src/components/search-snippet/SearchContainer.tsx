"use client";

import dummyData from "@/utils/dummy-data";
import EmptyList from "../home/EmptyList";
import SearchList from "./SearchList";
import { useState } from "react";
import SearchFilter from "../search-filters/filtersidebar";
import SearchBarItemForm from "../hotel-search-bar/searchbaritemform";

const SearchContainer = () => {
  // To Do: Call API get data from database
  // Use dummy data to make this work at first
  const [query, setQuery] = useState("");
  const properties = dummyData;
  const keys = ["name", "city"];

  const search = (data: any[]) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query))
    );
  };

  if (properties.length === 0) {
    return (
      <EmptyList
        heading="No result."
        message="Try changing or removing some of your filters."
        btnText="Clear Filters"
      />
    );
  }

  return (
    <>
      <div className="flex-col float-right w-1/4 ml-5 justify-around items-center shadow-md">
          <SearchBarItemForm title="Search by property name" content={  
            <input className="p-1 focus:outline-none" placeholder="Search property here... " onChange={e=> setQuery(e.target.value)}></input>
          }/>
          <SearchFilter/>
      </div>
      <SearchList properties={search(properties)} />
    </>
    );
};

export default SearchContainer;
