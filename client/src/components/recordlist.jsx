import React from "react";
import { Link } from "react-router-dom";

const emptyImages = null;
const Recordlist = (props) => {
  return (
    <div className="">
      <div className="">
        <div className="">
          {props.record.image !== emptyImages ? (
            <img
              src={props.record.image}
              alt={props.record.title}
              className=""
            />
          ) : (
            <img
              src={props.record.images}
              alt={props.record.title}
              className=""
            />
          )}
          <div className="">
            <h5 className="">{props.record.title}</h5>
            <div className=" ">
              <p>{props.record.title}</p>
              <span>{props.record.description}</span>
            </div>
            <p className="">{props.record.tag}</p>
            <div className="">
              <a href="{props.record.url}" className="">
                {props.record.url}
              </a>
            </div>
            <Link className="" to={`/edit/${props.record._id}`}>
              Upravit
            </Link>
            <button
              className=""
              onClick={() => {
                props.deleteRecord(props.record._id);
              }}
            >
              Smazat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recordlist;
