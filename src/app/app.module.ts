import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule, SubsystemManager } from '@app/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import subsystem from './subsystem';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        RouterModule,
        AppRoutingModule,
        CoreModule.forRoot(),
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'fa' },
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
  constructor(subsystemManager: SubsystemManager) {
    subsystemManager.register(subsystem);
}
}
