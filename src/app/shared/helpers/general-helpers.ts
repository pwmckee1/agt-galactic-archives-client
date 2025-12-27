import _ from 'lodash';

import { DotNetExceptionMessage } from '@shared/models/exceptions/dotnet-exception-message';
import { ExceptionMessage } from '@shared/models/exceptions/exception-message';


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

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
