import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilityService {
  private readonly envConfig = {};

  getErrorResponse(errorCode, errorMessage) {
    return {
      error: {
        status: false,
        error_code: errorCode,
        error_message: errorMessage,
      },
    };
  }
  getOkResponse(result) {
    return {
      Success: {
        status: true,
        Data: result,
      },
    };
  }
}
