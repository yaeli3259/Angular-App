import { Component, Injectable, Input, OnInit } from '@angular/core';
import { Course, LearningMode } from '../../models/course.model';
import { CourseService } from '../../services/course.service';
@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.css']
})
@Injectable()
export class AllCoursesComponent {
@Input()
selectedCourse:Course |undefined;

courses: Course[] =[];
addCourse=false;

searchText: string = "";
searchText2: string = "";
filteredCourses: Course[] = [];
categories: string[] = [];
nameFilter: string = '';
categoryFilter: string = '';
learningModeFilter: string = '';
selectedCategory: string = '';
handleSearch(event: Event) {
  // המתנה 300 מילי-שניות (0.3 שניות) לכל קלידה
  setTimeout(() => {
    // בדיקה שהערך לא יבוצע סינון אם זהו ערך זהה לערך הקודם
    if (this.searchText === (event.target as HTMLInputElement).value) {
      // סינון הסטודנטים לפי מילת החיפוש
      this.filteredCourses = this.courses.filter(course =>
        course.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }, 300);
}

handleSearch2(event: Event) {
  setTimeout(() => {
    const searchText2 = (event.target as HTMLInputElement).value.toLowerCase();
    if (!searchText2) { // אם החיפוש ריק
      this.filteredCourses = this.courses; // תציג שוב את כל הקורסים
      return;
    }
    if (this.searchText2 === searchText2) {
      this.filteredCourses = this.courses.filter(course =>
        course.learningMode === this.getLearningModeFromString(searchText2)
      );
    }
  }, 300);
}


getLearningModeFromString(searchText: string): LearningMode | string {
  switch (searchText.toLowerCase()) {
    case 'zoom':
      return LearningMode.Zoom;
    case 'frontal':
      return LearningMode.Frontal;
    default:
      return "No matching results found";
  }
}
showEditComponent() {
  this.addCourse = !this.addCourse;
}
showCourse(selectedCourse:Course){
 this.selectedCourse=selectedCourse;
}
getCourses(){
  console.log("enter to get courses!");
this._courseService.getCoursesFromServer().subscribe(
  data=>{
    this.courses=data;
  },
  error =>{
    console.error('Error fetching courses: ' ,error);
  }
);

}
constructor(private _courseService:CourseService){
this.getCourses();
}
}
