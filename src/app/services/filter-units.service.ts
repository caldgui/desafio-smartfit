import { Injectable } from '@angular/core';
import { Location } from '../types/location.interface';

const OPENING_HOURS = {
  morning:{
    first: '06',
    last: '12'
  },
  afternoon:{
    first: '12',
    last: '18'
  },
  night:{
    first: '18',
    last: '23'
  }
}

type HOUR_INDEXES = 'morning' | 'afternoon' | 'night';

@Injectable({
  providedIn: 'root'
})

export class FilterUnitsService {

  constructor() { }

  public filterUnits(unit:Location, openHour: string, closeHour: string){
    if (!unit.schedules) return true;

    let openHourFilter = parseInt(openHour, 10);
    let closeHourFilter = parseInt(closeHour, 10);

    let todaysWeekday = this.transformWeekday(new Date().getDay());

    for(let i = 0; i < unit.schedules.length; i++){
      let scheduleHour = unit.schedules[i].hour;
      let scheduWeekday = unit.schedules[i].weekdays;
      if(todaysWeekday === scheduWeekday){
        if(scheduleHour !== 'Fechada'){
          let [unitOpenHour, unitCloseHour] = scheduleHour.split('às');
          let unitOpenHourFilter = parseInt(unitOpenHour.replace('h', ''), 10);
          let unitCloseHourFilter = parseInt(unitCloseHour.replace('h', ''), 10);

          if (unitOpenHourFilter <= openHourFilter && unitCloseHourFilter >= closeHourFilter)
            return true;
          else
            return false;
          }
        }
      }
      return false;
  }
  

  public transformWeekday(weekday: number){
    switch(weekday){
      case 0:
          return 'Dom.'
      case 6:
          return 'Sáb.'
      default:
          return 'Seg. à Sex.'
    }

  }

  public filter(results: Location[], showClosed: boolean, hour: string){
    let intermediateResults = results;
    
    if(!showClosed){
      intermediateResults = results.filter(location => location.opened ==true);
    }
    if(hour){
      const OPEN_HOUR = OPENING_HOURS[hour as HOUR_INDEXES].first;
      const CLOSE_HOUR = OPENING_HOURS[hour as HOUR_INDEXES].last;
      return intermediateResults.filter(location => this.filterUnits(location, OPEN_HOUR, CLOSE_HOUR));
  }else{
    return intermediateResults;
  }
  }
}
