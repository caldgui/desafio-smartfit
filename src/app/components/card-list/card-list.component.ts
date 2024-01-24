import { Component, Input, OnInit } from '@angular/core';
import { GetUnitService } from '../../services/get-unit.service';
import { Location } from '../../types/location.interface';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CardComponent, 
            CommonModule],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss'
})
export class CardListComponent implements OnInit{

  @Input() unitsList: Location[] = [];

  constructor() {}

  ngOnInit(): void {
  }

}
