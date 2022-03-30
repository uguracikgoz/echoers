import { createLogger, transports, format } from "winston";
import config from "../config";


export const logger = createLogger({
    transports: [
        new transports.Console({
        level: config.logs.level,
        format: format.combine(
            format.colorize(),
            format.printf(({ timestamp, level, message, metadata }) => {
            metadata = Object.keys(metadata).length === 0 ? '' : JSON.stringify(metadata);
            return `[${timestamp}] ${level}: ${message}. ${metadata}`;
            })
        ),
        }),
        new transports.File({
        dirname: "logs",
        filename: "out.log",
        format: format.combine(format.json()),
        }),
    ],
    format: format.combine(format.metadata(), format.timestamp()),
});
