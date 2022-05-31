const express = require("express");

require("dotenv").config({ path: "../config.env" });
// linksRouter is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const linksRouter = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
//REQUEST DOM
const jsdom = require("jsdom");
const fetch = require("node-fetch");

// This section will help you get a list of all the records.
linksRouter.route("/links").get(function (req, res) {
  let db_connect = dbo.getDb(process.env.LINKSDB);
  db_connect
    .collection("Urls")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single record by id
linksRouter.route("/links/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("Urls").findOne(myquery, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

function linkconvert(url) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      mode: "no-cors",
      cache: "no-cache",
      credentials: "omit",
      headers: {
        "Content-Type": "text/html",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    })
      .then((response) => response.text())
      .then(function (html) {
        // This is the HTML from our response as a text string
        resolve(html);
      });
  });
}

linksRouter.route("/links/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  linkconvert(req.body.url).then((text) => {
    const dom = new jsdom.JSDOM(text);
    let domCheckerDescription = dom.window.document.querySelector(
      'meta[property="og:description"]'
    );
    let domCheckerImage = dom.window.document.querySelector(
      'meta[property="og:image"]'
    );
    let domCheckerImages = dom.window.document.querySelectorAll("img");

    let domCheckerTitle = dom.window.document.querySelector(
      'meta[property="og:title"]'
    );

    let metaDescription = null;
    let metaImage = null;
    let metaTitle = null;
    let metaImages = [];
   

    let domain = new URL(req.body.url);

    domCheckerImages.forEach((img) => {
      metaImages.push(domain.protocol + "//"+ domain.hostname + img.src);
    });

    if (domCheckerDescription != null) {
      metaDescription = domCheckerDescription.content;
    } else {
      let domCheckerDescriptionAlternative =
        dom.window.document.querySelector("title");
      metaDescription = domCheckerDescriptionAlternative.textContent;
    }
    if (domCheckerImage != null) {
      metaImage = domCheckerImage.content;
    }
    if (domCheckerTitle != null) {
      metaTitle = domCheckerTitle.content;
    } else {
      let domCheckerTitleAlternative =
        dom.window.document.querySelector("title");
      metaTitle = domCheckerTitleAlternative.textContent;
    }

    let myobj = {
      title: metaTitle,
      image: metaImage,
      images: metaImages,
      description: metaDescription,
      url: req.body.url,
      tag: req.body.tag,
    };
    db_connect.collection("Urls").insertOne(myobj, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
  });
});

// This section will help you update a record by id.
linksRouter.route("/edit/:id").post((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      title: req.body.title,
      image: req.body.image,
      description: req.body.description,
      url: req.body.url,
      tag: req.body.tag,
    },
  };
  db_connect
    .collection("Urls")
    .updateOne(myquery, newvalues, function (err, result) {
      if (err) throw err;
      response.json(result);
    });
});
// This section will help you delete a record
linksRouter.route("/links/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("Urls").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

module.exports = linksRouter;
