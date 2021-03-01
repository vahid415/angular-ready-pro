import { EventEmitter, InjectionToken } from '@angular/core';

export class AppInput {
}

export const hasObservers = (emitter: EventEmitter<any>) => emitter && emitter.observers.length > 0;
export const RTL = new InjectionToken<string>('Right-to-Left token');
export const requiresZoneOnBlur = (ngControl: any): any => ngControl
    && (!ngControl.touched || (ngControl.control && ngControl.control.updateOn === 'blur'));
