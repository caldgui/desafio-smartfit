import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GetUnitService } from '../../services/get-unit.service';
import { HttpClientModule } from '@angular/common/http';
import { Location } from '../../types/location.interface';

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
              private getUnitService: GetUnitService) {}

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
    console.log(this.formGroup.value);
    if(!this.formGroup.value.showClosed){
      this.filteredResults = this.results.filter(location => location.opened ===true)
    }else{
      this.filteredResults = this.results;
    }
  }

  public onClean(){
    this.formGroup.reset();
  }
}
