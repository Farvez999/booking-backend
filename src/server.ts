/* eslint-disable no-console */
import { Server } from "http";
import mongoose from "mongoose";

import { app } from "./app";
import config from "./config/index";

// uncaought error
process.on("uncaughtException", (err) => {
  console.log(err);

  process.exit(1);
});

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    server = app.listen(config.port, () => {
      console.log(`application listening on port ${config.port}`);
    });
    console.log("database connected successfully wow!!!!!!");
  } catch (err) {
    console.log(err);
  }

  process.on("unhandledRejection", (error) => {
    console.log("server is closed");
    if (server) {
      server.close(() => {
        console.error(error);
        process.exit(1);
      });
    }
    {
      process.exit(1);
    }
  });
}

main();

// sigterm
process.on("SIGTERM", () => {
  console.log("sigterm received");
  if (server) {
    server.close();
  }
});
