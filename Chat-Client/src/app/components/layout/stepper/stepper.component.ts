import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  host: {
    class: 'stepper-component'
  }
})
export class StepperComponent implements OnChanges {

  @Input() currentStage: number = 1;
  activeSteps: boolean[] = [true, false, false];

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentStage'] && !changes['currentStage'].firstChange) {
      const prevStage = changes['currentStage'].previousValue;
      this.activeSteps[prevStage - 1] = true;
    }
  }

  public isStepActive(step: number): boolean {
    return this.currentStage === step || this.activeSteps[step - 1];
  }
}
