import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { APP_CONSTANTS } from './helper/constants';


@Injectable()
export class userService {
    constructor(public http: HttpClient){}
    login(data): Observable<any> {
        return this.http.post(APP_CONSTANTS.login_admin, data);
    }

    getdevotions(data): Observable<any> {
        return this.http.post(APP_CONSTANTS.getDevotions, data);
    }

    insertDevotion(data): Observable<any> {
        return this.http.post(APP_CONSTANTS.insertDevotions, data);
    }
    getDevotionById(data): Observable<any> {
        return this.http.post(APP_CONSTANTS.getDevotionById, data);
    }
    getDevotionByDate(data): Observable<any> {
        return this.http.post(APP_CONSTANTS.getDevotionByDate, data);
    }
    updateDevotionById(data): Observable<any> {
        return this.http.post(APP_CONSTANTS.updateDevotionById, data);
    }
    removeDevotionById(data): Observable<any> {
        return this.http.post(APP_CONSTANTS.removeDevotionById, data);
    }
    updateTestimonies(data): Observable<any> {
        return this.http.post(APP_CONSTANTS.updateTestimonies, data);
    }
    getTestimonies(): Observable<any> {
        return this.http.post(APP_CONSTANTS.getTestimonies, {});
    }
    updateConfession(data): Observable<any> {
        return this.http.post(APP_CONSTANTS.updateConfession, data);
    }
    getConfession(): Observable<any> {
        return this.http.post(APP_CONSTANTS.getConfession, {});
    }
    uploadImage(data): Observable<any> {
        return this.http.post(APP_CONSTANTS.uploadImage, data);
    }
}