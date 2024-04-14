import { Component, Input } from '@angular/core';
import { Equation } from 'src/app/models/Equation';
import { MatchesUtitlies } from 'src/app/services/Matches/MatchesUtitlies';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css']
})
export class EquationComponent {

  @Input()
  equation!: Equation;

  constructor(private helper: MatchesUtitlies) {
  }

  ngOnInit() {
    if (!this.equation) {
      this.equation = this.helper.getDefaultEquation();
    }
  }
}
