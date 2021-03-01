import {
    InjectionToken, Optional,
    Inject, Injectable, EventEmitter, Output, Renderer2, RendererFactory2
} from '@angular/core';
import { ɵDomRendererFactory2 } from '@angular/platform-browser';
import { Observable, ReplaySubject } from 'rxjs';
import { share } from 'rxjs/operators';
import { LanguageType } from '../_enums/language-types';


// eslint-disable-next-line no-shadow
export enum LayoutDirection {
    LTR = 'ltr',
    RTL = 'rtl',
}

// eslint-disable-next-line no-shadow
export enum SideBarStates {
    Expanded = 'expanded',
    Compacted = 'compacted',
}

/**
 * Layout direction setting injection token.
 * */
export const LAYOUT_DIRECTION = new InjectionToken<LayoutDirection>('Layout direction');

/**
 * Layout Direction Service.
 * Allows to set or get layout direction and listen to its changes
 */
@Injectable({ providedIn: 'root' })
export class LayoutDirectionService {
    private _directionChange = new ReplaySubject(1);
    showSideBar = true;
    renderer: Renderer2
    toggleState: SideBarStates = SideBarStates.Expanded;
    @Output() sideBarToggle = new EventEmitter<SideBarStates>();

    constructor(
        @Inject(LAYOUT_DIRECTION) private direction = LayoutDirection.LTR,
        private rendererFactory2: RendererFactory2
    ) {
        this.setDirection(direction);
        this.renderer = rendererFactory2.createRenderer(null, null);
    }

    /**
     * Returns true if layout direction set to left to right.
     * @returns boolean.
     * */
    public isLtr(): boolean {
        return this.direction === LayoutDirection.LTR;
    }

    setLanguage(lan: LanguageType): void {
        if (lan === LanguageType.FA) {
            this.renderer.removeClass(document.body, 'ltr');
            this.renderer.addClass(document.body, 'rtl');
            this.direction = LayoutDirection.RTL;
        } else {
            this.renderer.removeClass(document.body, 'rtl');
            this.renderer.addClass(document.body, 'ltr');
            this.direction = LayoutDirection.LTR;
        }
    }

    /**
     * Returns true if layout direction set to right to left.
     * @returns boolean.
     * */
    public isRtl(): boolean {
        return this.direction === LayoutDirection.RTL;
    }

    /**
     * Returns current layout direction.
     * @returns LayoutDirection.
     * */
    getDirection(): LayoutDirection {
        return this.direction;
    }

    /**
     * Sets layout direction
     * @param {LayoutDirection} direction
     */
    setDirection(direction: LayoutDirection) {
        this.direction = direction;
        this._directionChange.next(direction);
    }

    /**
     * Triggered when direction was changed.
     * @returns Observable<LayoutDirection>.
     */
    oDirectionChange(): Observable<LayoutDirection> {
        return this._directionChange.pipe(share<LayoutDirection>());
    }

    toggleSideBar() {
        this.showSideBar = !this.showSideBar;
        this.showSideBar ? this.toggleState = SideBarStates.Expanded : this.toggleState = SideBarStates.Compacted;
        this.sideBarToggle.emit(this.toggleState);
    }
}
