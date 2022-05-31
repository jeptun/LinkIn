import { Link } from "react-router-dom";

import { HiLink } from "react-icons/hi";

var randomColor = require("randomcolor");

const emptyImages = null;

const Table = ({ data }) => {
  const color1 = {
    color: randomColor(),
  };
  const color2 = {
    color: randomColor(),
  };
  const color3 = {
    color: randomColor(),
  };
  const color4 = {
    color: randomColor(),
  };
  const color5 = {
    color: randomColor(),
  };
  const color6 = {
    color: randomColor(),
  };
  const color7 = {
    color: randomColor(),
  };
  const color8 = {
    color: randomColor(),
  };

  const bg_color1 = {
      background: randomColor(),
    },
    bg_color2 = {
      background: randomColor(),
    },
    bg_color3 = {
      background: randomColor(),
    },
    bg_color4 = {
      background: randomColor(),
    },
    bg_color5 = {
      background: randomColor(),
    },
    bg_color6 = {
      background: randomColor(),
    },
    bg_color7 = {
      background: randomColor(),
    },
    bg_color8 = {
      background: randomColor(),
    };

  const randomColors = randomColor({ count: 40 });
  const colorsHash = [
    color1,
    color2,
    color3,
    color4,
    color5,
    color6,
    color7,
    color8,
  ];
  const colorsBG = [
    bg_color1,
    bg_color2,
    bg_color3,
    bg_color4,
    bg_color5,
    bg_color6,
    bg_color7,
    bg_color8,
  ];
  // console.log(colors)

  return (
    <div className="grid justify-center  px-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3  xl:grid-cols-4 2xl:grid-cols-5 gap-4 my-10 bg-white dark:bg-magicBlack-100 ">
      {data.map((item, index) => (
        <div
          style={colorsBG[Math.floor(Math.random() * colorsBG.length)]}
          className="rounded-t-lg"
          key={index}
        >
          <div className="rounded-t-md relative transition ease-in-out delay-50 hover:-translate-y-1 duration-300 bg-white dark:bg-magicBlack-100  shadow-md max-w-xs md:max-w-none overflow-hidden">
            <div className="mb-2">
              {item.image !== emptyImages ? (
                <img
                  className="h-40 lg:h-42 w-full object-cover border-b-4  dark:border-royalblue border-magicBlack-100"
                  src={item.image}
                  alt={item.title}
                />
              ) : (
                <img
                  className="h-40 lg:h-42 w-full object-cover border-b-4 border-royalblue"
                  src={item.images}
                  alt={item.title}
                />
              )}
              <div className="p-3">
                <h2 className="truncate font-semibold text-xl leading-6 text-magicBlack-100 dark:text-white border-b-2  py-2">
                  {item.title}
                </h2>
                <p
                  style={
                    colorsHash[Math.floor(Math.random() * colorsHash.length)]
                  }
                  className=" font-semibold uppercase"
                >
                  {item.tag}
                </p>
                <p className="font-normal text-base line-clamp-1">
                  {item.description}
                </p>
                <a
                  className="w-10 h-10 -m-4 bg-royalblue flex items-center justify-center text-center no-underline rounded-full text-white hover:bg-blue-500 absolute top-2 right-2"
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <HiLink />
                </a>
                <div className="flex">
                  <div className="m-auto">
                    <div className="p-2 pl-4 pr-4 bg-transparent rounded-md border-2 border-magicBlack-100 text-magicBlack-100 dark:border-white dark:text-white text-lg  dark:hover:bg-white hover:bg-magicBlack-100  hover:text-white dark:hover:text-magicBlack-100">
                      <Link to={`/edit/${item._id}`}> Upravit</Link>
                    </div>
                  </div>

                  {/* <div className="m-auto">
                    <div className="p-2 pl-4 pr-4 bg-transparent rounded-md border-2 border-magicBlack-100 text-magicBlack-100 dark:border-white dark:text-white text-lg  dark:hover:bg-white hover:bg-magicBlack-100 hover:text-white  dark:hover:text-magicBlack-100">
                      <Link to={`/edit/${item._id}`}>Smazat</Link>
                    </div>
                  </div> */}
                </div>
                {/*dodelat mazaci button */}
                {/* <button
                    className="btn btn-link d-inline p-2"
                    onClick={() => {
                      data.deleteRecord(item._id);
                    }}
                  >
                    Smazat
                  </button> */}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    
  );
};

export default Table;
