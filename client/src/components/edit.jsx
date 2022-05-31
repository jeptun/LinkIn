import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
  const [form, setForm] = useState({
    title: "",
    image: "",
    description: "",
    images: [],
    url: "",
    tag: "",
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(
        `http://localhost:5000/links/${params.id.toString()}`
      );

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }
      setForm(record);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedUrl = {
      title: form.title,
      image: form.image,
      images: form.images,
      description: form.description,
      url: form.url,
      tag: form.tag,
    };

    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:5000/edit/${params.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedUrl),
    });
    navigate("/");
  }

  const emptyImages = null;

  return (
    <>
      <div className="">
        <div className="">
          {/* *****KARTA***** */}
          <div className="">
            <div className="" >
              {form.image !== emptyImages ? (
                <img
                  src={form.image}
                  alt={form.title}
                  className=""
                />
              ) : (
                <img
                  src={form.images}
                  alt={form.title}
                  className=""
                />
              )}
              <div className="">
                <h2 className="">{form.title}</h2>
                <a href={form.url}>{form.title}</a>
                <span className="">{form.tag}</span>
                <p className="">{form.description}</p>
              </div>
            </div>
          </div>
          {/* *****FORMULÁŘ***** */}
          <div className="">
            <div>
              <h3>Update Record</h3>
              <form onSubmit={onSubmit}>
                <div className="">
                  <label htmlFor="title">title: </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={form.title}
                    onChange={(e) => updateForm({ title: e.target.value })}
                  />
                </div>
                {form.image !== emptyImages ? (
                  <div className="">
                    <label htmlFor="image">image: </label>
                    <input
                      list="imagesList"
                      type="text"
                      className=""
                      id="image"
                      value={form.image}
                      onChange={(e) => updateForm({ image: e.target.value })}
                    />
                  </div>
                ) : (
                  <div className="">
                    <label>
                      Vyber si obrázek
                      <select className="">
                        {form.images.map((image, index) => (
                          <option
                            onChange={setForm.images}
                            value={image}
                            key={index}
                          >
                            {image}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                )}
                <div className="">
                  <label htmlFor="description">description: </label>
                  <input
                    type="text"
                    className=""
                    id="description"
                    value={form.description}
                    onChange={(e) =>
                      updateForm({ description: e.target.value })
                    }
                  />
                </div>
                <div className="">
                  <label htmlFor="url">url: </label>
                  <input
                    type="text"
                    className=""
                    id="url"
                    value={form.url}
                    onChange={(e) => updateForm({ url: e.target.value })}
                  />
                </div>

                <div className="">
                  <label htmlFor="tag">tag: </label>
                  <input
                    type="text"
                    className=""
                    id="tag"
                    value={form.tag}
                    onChange={(e) => updateForm({ tag: e.target.value })}
                  />
                </div>
                <br />
                <div className="">
                  <input
                    type="submit"
                    value="Update Record"
                    className=""
                  />
                </div>
              </form>
            </div>
          </div>
          {/* *****KONEC***** */}
        </div>
      </div>
    </>
  );
}
