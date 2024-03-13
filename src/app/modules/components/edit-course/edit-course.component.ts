import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';
@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent {
  @Input() course: Course;
  @Output() finishEditing: EventEmitter<void> = new EventEmitter<void>()

  originalCourse: Course; 
  syllabusText: string = '';
  showEditCategory: boolean = false;
  showEditSyllabus: boolean = false;
  editedImage: string = '';
  constructor(private courseService: CourseService) {}

  
  ngOnInit(): void {
    if (!this.editedImage) {
      this.editedImage = this.course.image;
    }
    this.syllabusText = this.course.syllabus ? this.course.syllabus.join('\n') : '';
    this.originalCourse = { ...this.course };
  }
  toggleEditCategory() {
    this.showEditCategory = !this.showEditCategory;
  }
  toggleEditSyllabus() {
    this.showEditSyllabus = !this.showEditSyllabus;
  }
  addSyllabusItem(event: Event) {
    // Prevent default behavior of the event
    event.preventDefault();

    // Update the course syllabus only if the event is triggered by the 'enter' key or if the textarea loses focus
    if (event.type === 'keydown' && (event as KeyboardEvent).key !== 'Enter') {
      return;
    }

    // Split the textarea value by newline to get individual syllabus items
    const syllabusItems = this.syllabusText.split('\n');

    // Remove any empty strings from the array and trim whitespace
    const validSyllabusItems = syllabusItems.filter(item => item.trim() !== '');

    // Update the course syllabus with the new items
    this.course.syllabus = validSyllabusItems;

    // Clear the textarea for the next input
    this.syllabusText = this.course.syllabus.join('\n');
  }
  
finishEdit(){
  this.finishEditing.emit();
}

  cancel() {
    this.course = { ...this.originalCourse };
    this.showEditCategory = false;
    this.finishEdit();
  }
  saveChanges() {
    this.course.image = this.editedImage;
    this.courseService.updateCourseToServer(this.course).subscribe(
      updatedCourse => {
        console.log('Course updated successfully:', updatedCourse);
        // Logic after successful update (e.g., navigate away)
      },
      error => {
        console.error('Error updating course:', error);
        // Handle error
      }
    );
    this.finishEdit();
  }

}