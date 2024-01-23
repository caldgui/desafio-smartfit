import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GetUnitService } from '../../services/get-unit.service';
import { HttpClientModule } from '@angular/common/http';
import { Location } from '../../types/location.interface';
import { FilterUnitsService } from '../../services/filter-units.service';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})
export class FormsComponent implements OnInit{

  public results: Location[] = [];
  public filteredResults: Location[] = [];
  public formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private getUnitService: GetUnitService,
              private filterUnitsService: FilterUnitsService) {}

  ngOnInit(): void {
    this.getUnitService.getAllUnits().subscribe((response) => {
      this.results = response.locations;
      this.filteredResults = response.locations;
      console.log(response.locations)
    });
    this.formGroup = this.formBuilder.group({
      hour: '',
      showClosed: true
    })
  }

  public onSubmit(){
    let {showClosed, hour} = this.formGroup.value;
    this.filteredResults = this.filterUnitsService.filter(this.results, showClosed, hour)
  }

  public onClean(){
    this.formGroup.reset();
  }
}


