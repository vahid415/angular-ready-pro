import { Subscription } from 'rxjs';
import { RouterOutlet } from '@angular/router';
import { Directive, OnDestroy } from '@angular/core';
import { ComponentTreeService } from './component-tree-service';

@Directive({
  selector: '[appRouterOutlet]',
  exportAs: 'appRouterOutlet',
})
export class RouterOutletDirective implements OnDestroy {
  private _activateSubscription: Subscription;
  private _deactivateSubscription: Subscription;

  constructor(
    outlet: RouterOutlet,
    componentTreeService: ComponentTreeService
  ) {
    this._activateSubscription = outlet.activateEvents.subscribe(comp => {
      componentTreeService.push(comp);
    });

    this._deactivateSubscription = outlet.deactivateEvents.subscribe(comp => {
      componentTreeService.pop();
    });
  }

  ngOnDestroy(): void {
    this._activateSubscription.unsubscribe();
    this._deactivateSubscription.unsubscribe();
  }
}
