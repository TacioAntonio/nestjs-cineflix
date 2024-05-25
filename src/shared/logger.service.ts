import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LogService {
  private readonly logger = new Logger(LogService.name);

  success(message: string) {
    this.logger.log(message);
  }

  warning(message: string) {
    this.logger.warn(message);
  }

  error(message: string) {
    this.logger.error(message);
  }
}
