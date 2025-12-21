import { DotNetExceptionMessage } from '@shared/models/exceptions/dotnet-exception-message';
import { ExceptionMessage } from '@shared/models/exceptions/exception-message';

import _ from 'lodash';

export namespace GeneralHelpers {


  export function setMessages(messages: string[] | any[] | DotNetExceptionMessage[]) {
    if (messages.length > 0) {
      if (typeof messages[0] === 'string') {
        return messages;
      }
      if (_.has(messages[0], 'ExceptionDetail')) {
        const exceptionMessages: DotNetExceptionMessage[] = messages as DotNetExceptionMessage[];
        return exceptionMessages.map(em => em.ExceptionDetail.Message as string);
      }
      if (_.has(messages[0], 'exceptionDetail')) {
        const exceptionMessages: ExceptionMessage[] = messages as ExceptionMessage[];
        return exceptionMessages.map(em => em.exceptionDetail.message as string);
      }
      return ['An error occurred during this request'];
    }
    return [];
  }
}
