import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserGlobalRef, GlobalRef } from '@shared/models/application/global-ref';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class SharedModule {
  static forBrowser(): ModuleWithProviders<any> {
    return {
      ngModule: SharedModule,
      providers: [
        { provide: GlobalRef, useClass: BrowserGlobalRef }
      ]
    };
  }
}
