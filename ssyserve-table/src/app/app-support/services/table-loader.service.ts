import { Injectable, Input } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class TableLoaderService {
    public dataLoaded: Boolean = false;

    constructor() {
    }

    setLoading() {
      this.dataLoaded = false;
    }

    setLoaded() {
      this.dataLoaded = true;
    }

}
