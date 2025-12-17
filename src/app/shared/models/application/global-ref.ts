export interface Global {
  /** @deprecated - not used by any redesigned components. Follow the ViewChild pattern to access the editor. */
  tinymce?: any;
}

export abstract class GlobalRef {
  abstract get nativeGlobal(): Global;
}

export class BrowserGlobalRef extends GlobalRef {
  get nativeGlobal(): Global { return (window as any) as Global; }
}
