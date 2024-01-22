import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GetUnitService } from '../../services/get-unit.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})
export class FormsComponent implements OnInit{

  public results = [];
  public formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private getUnitService: GetUnitService) {}

  ngOnInit(): void {
    this.getUnitService.getAllUnits().subscribe((response) => {
      console.log(response)
    });
    this.formGroup = this.formBuilder.group({
      hour: '',
      showClosed: false
    })
  }

  public onSubmit(){
    console.log(this.formGroup.value);
  }

  public onClean(){
    this.formGroup.reset();
  }
}
