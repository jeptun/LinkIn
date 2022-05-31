import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
  const [form, setForm] = useState({
    title: "",
    image: "",
    description: "",
    url: "",
    tag: "",
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newUrl = { ...form };
    await fetch("http://localhost:5000/links/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUrl),
    })
      .catch((error) => {
        window.alert(error);
        return;
      })
      .then((response) => response.json())
      // .then(data => setForm({ title: "", image: "", description: "", url: "", tag: "" }); );
      .then((data) => navigate("/edit/" + data.insertedId));
  }
  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <h3 className="text-9xl">Create New Links</h3>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="url">url</label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="url"
            value={form.url}
            onChange={(e) => updateForm({ url: e.target.value })}
          />
        </div>
        <div className="flex items-center justify-between">
          <input type="submit" value="Vlož link" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" />
        </div>
      </form>
    </div>
  );
}
