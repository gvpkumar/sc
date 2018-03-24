import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
export let isDebugMode = true;
const noop = (): any => undefined;
@Injectable()
export class LoggerService {

    get log() {
        if (isDebugMode) {
          return console.log.bind(console);
        } else {
          return noop;
        }
      }
    
  get info() {
    if (isDebugMode) {
      return console.info.bind(console);
    } else {
      return noop;
    }
  }

  get warn() {
    if (isDebugMode) {
      return console.warn.bind(console);
    } else {
      return noop;
    }
  }

}