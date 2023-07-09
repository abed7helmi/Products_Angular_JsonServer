import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  public isLoading$ = new Subject<boolean>() // un observable
  constructor() { }

  showLoading() : void {
    this.isLoading$.next(true)
  }

  hideLoadingSpiner(): void {
    this.isLoading$.next(false);
  }
}
