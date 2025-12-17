import { GeneralHelpers } from '@shared/helpers/general-helpers';
import * as _ from 'lodash';

export class ApiResponse<T> {
  response: T;
  messages: string[];
  success: boolean = false;

  constructor(success?: boolean, data?: any) {
    this.success = (success) || false;

    if (this.success) {
      let response = null;
      let messages = [];
      if (data) {
        response = data.response;
        messages = data.messages || [];
      }

      this.response = response;
      this.messages = messages;
    } else if (data && _.has(data, 'response')) {
      if (data.response && _.has(data.response, 'Response')) {
        this.response = data.response.Response;
        this.messages = GeneralHelpers.setMessages(data.response.Messages);
      } else {
        this.response = data.response;
        this.messages = GeneralHelpers.setMessages(data.messages);
      }
    } else if (data && _.has(data, 'Response')) {
      this.response = data.Response;
      this.messages = GeneralHelpers.setMessages(data.Messages);
    }
  }

}
