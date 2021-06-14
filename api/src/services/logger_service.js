import winston from 'winston';

const dateFormat = () => { new Date(Date.now()).toUTCString(); };

class LoggerService {
  constructor() {
    this.log_data = null;
    const logger = winston.createLogger({
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          filename: './logs/challenge.log',
        }),
      ],
      format: winston.format.printf(info => {
        let message = `${dateFormat()} | ${info.level.toUpperCase()} | challenge.log | ${info.message} |`;
        message = info.obj ? `${message} data:${JSON.stringify(info.obj)} | ` : message;
        message = this.log_data ? `${message} log_data:${JSON.stringify(this.log_data)} |` : message;
        return message;
      }),
    });
    this.logger = logger;
  }

  setLogData(logData) {
    this.log_data = logData;
  }

  async info(message) {
    this.logger.log('info', message);
  }
/* eslint-disable */
  async info(message, obj) {
    this.logger.log('info', message, {
      obj,
    });
  }

  async warn(message) {
    this.logger.log('warn', message);
  }

  async warn(message, obj) {
    this.logger.log('warn', message, {
      obj,
    });
  }

  async debug(message) {
    this.logger.log('debug', message);
  }

  async debug(message, obj) {
    this.logger.log('debug', message, {
      obj,
    });
  }

  async error(message) {
    this.logger.log('error', message);
  }

  async error(message, obj) {
    this.logger.log('error', message, {
      obj,
    });
  }
}

let newLogger;
export default newLogger = new LoggerService();
