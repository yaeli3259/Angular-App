// import { Component, EventEmitter, Output } from '@angular/core';
// import { Course, LearningMode } from '../../models/course.model';
// import { CourseService } from '../../services/course.service';
// import { Router } from '@angular/router';
// import { Category } from '../../models/category.model';

// @Component({
//   selector: 'app-add-course',
//   templateUrl: './add-course.component.html',
//   styleUrls: ['./add-course.component.scss']
// })
// export class AddCourseComponent {
//   course: Course;
//   successMessage: string | undefined;
//   // originalCourse: Course; 
//   constructor(private _courseService: CourseService,private router: Router) {
//     this.course = new Course("0", '', new Category(), 0, null, [], LearningMode.Frontal, '', '');
//   }
//   @Output() finishEditing: EventEmitter<void> = new EventEmitter<void>()
//   inputString: string = '';
//   stringList: string[] = [];
//   selectedLearningMode:string;
//   addString() {
//     if (this.inputString.trim() !== '') {
//       const strings = this.inputString.split(/[,\n]/);
//       for (const str of strings) {
//         const trimmedStr = str.trim();
//         if (trimmedStr !== '') {
//           this.stringList.push();
//           this.course.syllabus.push(trimmedStr);
//         }
//       }
//       this.inputString = ''; // Clear input after adding strings
//     }
//   }
//   finish() {
//     this.finishEditing.emit();
//   }
//   cancel() {
//     this.finish();
//     this.router.navigate(['/allCourses']);
//   }

//   saveCourse() {
//     this.course.learningMode = this.selectedLearningMode === 'Frontal' ? LearningMode.Frontal : LearningMode.Zoom;
//     if (this.isValidCourse(this.course)) {
//       this._courseService.addCourseToServer(this.course).subscribe(
//         (response) => {
//           console.log('Response from server:', response);
//           // Handle the response here
//         },
//         (error) => {
//           console.error('Error adding course:', error);
//           // Handle the error here
//         }
//       );
//     }
//     this.cancel();
//   }

//   isValidCourse(course: Course): boolean {
//     return (
//       course &&
//       course.name &&
//       course.name.trim() !== '' &&
//       // course.category &&
//       course.lessonCount !== undefined &&
//       course.startDate &&
//       course.syllabus &&
//       course.syllabus.length > 0 &&
//       course.instructorCode &&
//       course.instructorCode.trim() !== '' &&
//       course.image &&
//       course.image.trim() !== '' &&
//       course.learningMode !== undefined
//     );
//   }
//   addSyllabusItem() {
//     this.course.syllabus.push('');
//   }

//   removeSyllabusItem(index: number) {
//     this.course.syllabus.splice(index, 1);
//   }
// }
import { Component, Output, EventEmitter } from '@angular/core';
import { Course, LearningMode } from '../../models/course.model';
import { CourseService } from '../../services/course.service';
import { Router } from '@angular/router';
import { Category } from '../../models/category.model';
import { NgModel } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent {
  course: Course;
  successMessage: string | undefined;
  categories: Category[] = [
    new Category(1, 'web', 'icon1.png'),
    new Category(2, 'hardware', 'icon2.png'),
    // Add more categories as needed
  ];

  selectedCategory: Category;
  constructor(private _courseService: CourseService, private router: Router) {
    this.course = new Course("0", '', new Category(), 0, null, [], LearningMode.Frontal, '', '');
  }

  @Output() finishEditing: EventEmitter<void> = new EventEmitter<void>();
  inputString: string = '';
  stringList: string[] = [];
  selectedLearningMode: string;

  saveCategory() {
    if (this.selectedCategory) {
      // Display SweetAlert message
      Swal.fire({
        icon: 'success',
        title: 'Saved Successfully',
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      // Display error message if no category is selected
      Swal.fire({
        icon: 'error',
        title: 'Please select a category first',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }
  addString() {
    if (this.inputString.trim() !== '') {
      const strings = this.inputString.split(/[,\n]/);
      for (const str of strings) {
        const trimmedStr = str.trim();
        if (trimmedStr !== '') {
          this.stringList.push();
          this.course.syllabus.push(trimmedStr);
        }
      }
      this.inputString = ''; // Clear input after adding strings
    }
  }

  cancel() {
    this.finish();
    this.router.navigate(['/allCourses']);
  }

  saveCourse() {
    alert("save course func");
    this.course.category.code = this.selectedCategory.code;
    this.course.category.name =this.selectedCategory.name;
    this.course.category.iconRoute=this.selectedCategory.iconRoute;
    this.course.learningMode = this.selectedLearningMode === 'Frontal' ? LearningMode.Frontal : LearningMode.Zoom;
    if (this.isValidCourse(this.course)) {
      alert("isValid");
      this._courseService.addCourseToServer(this.course).subscribe(
        (response) => {
          console.log('Response from server:', response);
          // Handle the response here
        },
        (error) => {
          console.error('Error adding course:', error);
          // Handle the error here
        }
      );
    }
    
  }

  isValidCourse(course: Course): boolean {
    return (
      course &&
      course.name &&
      course.name.trim() !== '' &&
      course.category &&
      course.category.code >= 1 && // Check for category code
      // course.lessonCount !== undefined &&
      course.lessonCount >= 1 && // Check for lesson count
      course.startDate && // You can add date validation here
      course.syllabus &&
      course.syllabus.length > 0 &&
      course.instructorCode &&
      course.instructorCode.trim() !== '' &&
      course.image &&
      course.image.trim() !== '' &&
      course.learningMode !== undefined
    );
  }

  finish() {
    this.finishEditing.emit();
  }

  addSyllabusItem() {
    this.course.syllabus.push('');
  }

  removeSyllabusItem(index: number) {
    this.course.syllabus.splice(index, 1);
  }
}


