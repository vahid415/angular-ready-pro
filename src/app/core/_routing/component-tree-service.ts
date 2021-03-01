import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentTreeService {
  private _treeValue = [];
  private _changeSubject = new Subject<any[]>();
  change = this._changeSubject.asObservable();

  push(component) {
    this._treeValue.push(component);
    this._changeSubject.next(this._treeValue);
  }

  pop() {
    this._treeValue.pop();
    this._changeSubject.next(this._treeValue);
  }

  get tree() {
    return this._treeValue;
  }
}
