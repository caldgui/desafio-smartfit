import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { FormsComponent } from './components/forms/forms.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CardListComponent } from './components/card-list/card-list.component';
import { BehaviorSubject } from 'rxjs';
import { Location } from './types/location.interface';
import { GetUnitService } from './services/get-unit.service';
import { CardComponent } from './components/card/card.component';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, 
              RouterOutlet, 
              HeaderComponent, 
              FormsComponent,
              CardListComponent,
              CardComponent, 
              ReactiveFormsModule, 
              HttpClientModule]
})
export class AppComponent {
  title = 'desafio-smartfit';

  public showList = new BehaviorSubject(false)
  public unitsList: Location[] = [];

  constructor(private getUnitService: GetUnitService) {}

  public onSubmit(){
    console.log("onSubmit")
    this.showList.next(true);
    this.unitsList = this.getUnitService.getFilteredUnits();
  }
}
