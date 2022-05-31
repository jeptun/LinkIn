import React, { useEffect, useState } from "react";
import Table from "./Table";
//*
import Recordlist from "./recordlist";
import Hero from "./Hero";

export default function LinkList() {
  const [records, setRecords] = useState([]);
  const [query, setQuery] = useState("");
  const keys = ["title", "tag"];

  const searchHandler = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query))
    );
  };
  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/links/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setRecords(records);
    }

    getRecords();

    return;
  }, [records.length]);

  // This method will delete a record
  async function deleteRecord(id) {
    await fetch(`http://localhost:5000/links/${id}`, {
      method: "DELETE",
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  // This method will map out the records on the table
  function recordList() {
    return records.map((record) => {
      return (
        <Recordlist
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }

  // This following section will display the table with the records of individuals.
  return (
    <div className="bg-white dark:bg-magicBlack-100">
      <Hero />
      <div className="w-full m-auto mt-8 bg-transparent border rounded-md lg:max-w-sm dark:border-gray-700 focus-within:border-blue-400 focus-within:ring focus-within:ring-blue-300 dark:focus-within:border-blue-400 focus-within:ring-opacity-40">
        <form className="flex flex-col lg:flex-row">
          <input
            placeholder="#Search"
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 h-10 px-4 py-2 m-1 text-black dark:placeholder-white placeholder-black bg-transparent border-none appearance-none dark:text-white focus:outline-none focus:placeholder-transparent focus:ring-0"
          />
        </form>
      </div>
      <Table
        data={searchHandler(records)}
        record={records}
        deleteRecord={() => deleteRecord(records.id)}
      />
     
      <h3>Link List</h3>
      {/* <div className="">{recordList()}</div> */}
    </div>
  );
}
