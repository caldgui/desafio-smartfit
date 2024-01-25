import { Component, Input } from '@angular/core';
import { Location } from '../../types/location.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  @Input() card!: Location;

  public city: string = '';

  public translateContent(content: string): string{
    if (!content) return '';
    let newContent = content.replace('<p>', '');
    newContent = newContent.replace('</p>', '');
    newContent = newContent.replace('&#8211;', '-');
    let finalContent = newContent.split('<br>');
    this.city = finalContent[1];

    return finalContent[0];
  }

}
