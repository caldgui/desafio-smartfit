import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UnitsResponse } from '../types/units-response.interface';
import { Location } from '../types/location.interface';

@Injectable({
  providedIn: 'root'
})
export class GetUnitService {

  readonly apiUrl = "https://test-frontend-developer.s3.amazonaws.com/data/locations.json"

  private allUnitsSubject: BehaviorSubject<Location[]> = new BehaviorSubject<Location[]>([]);
  private allUnits$: Observable<Location[]> = this.allUnitsSubject.asObservable();
  private filteredUnits: Location[] = [];

  constructor(private httpClient: HttpClient) { 
    this.httpClient.get<UnitsResponse>(this.apiUrl).subscribe((response) => {
      this.allUnitsSubject.next(response.locations);
      this.filteredUnits = response.locations;
    });
  }

  public getAllUnits(): Observable<Location[]>{
    return this.allUnits$
  }

  public getFilteredUnits(): Location[]{
    return this.filteredUnits;
  }

  public setFilteredUnits(filteredUnits: Location[]){
    this.filteredUnits = filteredUnits;
  }
}
