import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import BrowserAnimationsModule
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AppComponent } from './app.component';
import { LoginComponent } from './modules/components/login/login.component';
import { AllCoursesComponent } from './modules/components/all-courses/all-courses.component';
import { RegisterComponent } from './modules/components/register/register.component';
import { AddCourseComponent } from './modules/components/add-course/add-course.component';
import { LogoutComponent } from './modules/components/logout/logout.component';
import { CourseDetailsComponent } from './modules/components/course-details/course-details.component';
import { EditCourseComponent } from './modules/components/edit-course/edit-course.component';
import { LearningModelIconPipe } from './learning-model-icon.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AllCoursesComponent,
    RegisterComponent,
    AddCourseComponent,
    LogoutComponent,
    CourseDetailsComponent,
    EditCourseComponent,
    LearningModelIconPipe
  ],
  imports: [
    BrowserModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // Include BrowserAnimationsModule here
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'allCourses', component: AllCoursesComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'logout', component: LogoutComponent },
      { path: 'editCourse', component: EditCourseComponent },
      { path: 'addCourse', component: AddCourseComponent },
      { path: 'logout', component: LogoutComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
