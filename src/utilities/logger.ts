import { info } from "console";

class Logger {
    // LEVELS OF LOGGING
    private static readonly LOG_LEVELS = {
        INFO: '\x1b[36m[INFO]\x1b[0m',    // Cyan
        ERROR: '\x1b[31m[ERROR]\x1b[0m',  // red
        WARN: '\x1b[33m[WARN]\x1b[0m'     // yellow

    };

    constructor(private context: string) { }

    info(message: string): void {
        console.log(`${Logger.LOG_LEVELS.INFO} [${this.context}] ${message}`);
    }

    error(message: string, error?: any): void {
        console.error(`${Logger.LOG_LEVELS.ERROR} [${this.context}] ${message}`);
        if (error) {
            console.error(error);
        }
    }

    warn(message: string): void {
        console.warn(`${Logger.LOG_LEVELS.WARN} [${this.context}] ${message}`);
    }

}

export { Logger };
