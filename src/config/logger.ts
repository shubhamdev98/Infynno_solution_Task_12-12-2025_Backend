import pino from "pino";

const logger = pino({
  level: "info",
  timestamp: pino.stdTimeFunctions.isoTime, // 2025-12-12T20:00:00.000Z

  transport: {
    targets: [
      // Pretty console logs (development)
      {
        target: "pino-pretty",
        level: "info",
        options: {
          colorize: true,
          translateTime: "SYS:standard", // human readable time
        },
      },

      // File logging
      {
        target: "pino/file",
        level: "info", 
        options: {
        //   destination: "./logs/app.log", // file created automatically
          mkdir: true, 
        },
      },
    ],
  },
});

export default logger;
