const express = require("express");
const compression = require('compression')
const path = require("path")
const next = require("next");
const routes = require("../routes");
const mongoose = require("mongoose");


// server

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });

const handle = routes.getRequestHandler(app);

const authService = require("./services/auth");

const config = require("./config");

const bodyParser = require("body-parser");

const bookRoutes = require("./routes/book");

const portfolioRoutes = require("./routes/portfolio");

const blogRoutes = require("./routes/blog");

const robotsOptions = {
  root: path.join(__dirname, "../assets"),
  headers: {
    'Content-Type': 'text/plain;charset=UTF-8'
  }
}

// src

const secretData = [
  {
    title: "sercretData 1 ",
    description: "Plans how to build spaceship"
  },
  {
    title: "sercretData 2 ",
    description: "My sercret Password"
  }
];

mongoose
  .connect(config.DB_URI, { useNewUrlParser: true })
  .then(() => console.log("> Database is Connected!!"))
  .catch(err => console.error("Not Connected to Database ERROR! ", err));

// async () => (await mongoose.connect(config.DB_URI, { useNewUrlParser: true }))();

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(compression())
    server.use(bodyParser.json());

    // server.get('/profile/:id', (req, res) => {
    // 	const actualPage = '/profile';
    // 	const queryParams = { id: req.params.id };
    // 	app.render(req, res, actualPage, queryParams);
    // });

    server.use("/api/v1/portfolios", portfolioRoutes);
    server.use("/api/v1/blogs", blogRoutes);
    server.use("/api/v1/books", bookRoutes);

    server.get('/robots.txt',(req ,res) => {
      return res.status(200).sendFile("robots.txt" , robotsOptions);
    })

    server.get("/api/v1/secret", (req, res) => {
      return res.json(secretData);
    });

    server.get(
      "/api/v1/onlysiteowner",
      authService.checkJWK,
      authService.checkRole("siteOwner"),
      (req, res) => {
        return res.json(secretData);
      }
    );

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.use(function(err, req, res, next) {
      if (err.name === "UnauthorizedError") {
        res.status(401).send({
          title: "Unauthorized",
          detail: "UnauthorizedError Access!"
        });
      }
    });


    const PORT = process.env.PORT || 3000;

    server.use(handle).listen(PORT, (err) => {
      if (err) throw err
      console.log('> Ready on port ' + PORT)
    })
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
