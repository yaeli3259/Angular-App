import { Injectable } from "@angular/core";
import { Course } from "../models/course.model";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CourseService {

  constructor(private http: HttpClient) {}

  getCoursesFromServer(): Observable<Course[]> {
    return this.http.get<Course[]>("api/Course");
  }
updateCourseToServer(course: Course): Observable<Course> {
  // Construct the complete URL including the query parameter
  const url = `/api/Course?code=${course.code}`;

  // Use the course object as the request body
  return this.http.put<Course>(url, course).pipe(
    tap(updatedCourse => console.log('Course updated successfully:', updatedCourse))
  );
}
addCourseToServer(course: Course): Observable<Course> {
  return this.http.post<Course>("/api/Course/", course);
}

}

