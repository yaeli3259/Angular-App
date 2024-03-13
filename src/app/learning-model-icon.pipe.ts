import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'learningModelIcon'
})
export class LearningModelIconPipe implements PipeTransform {

  transform(value: number): string {
    if (value === 0) {
      return 'assets/zoom.png';
    } else if (value === 1) {
      return 'assets/frontal.png';
    } else {
      // Default image path if value is neither 0 nor 1
      return 'assets/default.png';
    }
  }
}
