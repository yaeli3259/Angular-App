
import { Observable, of } from "rxjs";
import { Lecturer } from "../models/lecturer.model";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user.model";
import { Injectable } from "@angular/core";
@Injectable()
export class LectureService {
    private apiUrl = "/api/Lecturer";
    lectures: Lecturer[] = [
        new Lecturer('1', 'John Doe', 'Address 1', 'john@example.com', 'password1'),
        new Lecturer('2', 'Jane Doe', 'Address 2', 'jane@example.com', 'password2'),
        new Lecturer('3', 'Alice Smith', 'Address 3', 'alice@example.com', 'password3')
    ];
    getLectures(): Observable<Lecturer[]> {
        return of(this.lectures);
    }
    postLecturer(lecturer: Lecturer): Observable<Lecturer> {
        // Add the new lecturer to the local array
        this.lectures.push(lecturer);
        // Return an observable that emits the newly added lecturer
        return of(lecturer);
    }
    // postLecturer(lecturer: Lecturer): Observable<Lecturer> {
    //     return this._httpClient.post<Lecturer>(this.apiUrl, lecturer);
    // }
    // getLectures(): Observable<Lecturer[]> {
    //     return this._httpClient.get<Lecturer[]>("api/Lecturer");
    // }
    IsLecture(user :User): boolean{
      let lect =  this.lectures.find(l=>user.name==l.name&&user.mail==l.mail&&user.password==l.password);
      console.log("lectures",this.lectures);
      console.log("user",user);
      console.log("lect",lect);
       return lect?true:false; 
    }
    constructor(private _httpClient: HttpClient) {

        this.getLectures().subscribe(res => {
            this.lectures = res
        }, err => {
            console.log(err)
        })
    }


}