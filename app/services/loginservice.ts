import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class LoginService {
    constructor(private http: Http) {
    }

    getLogin(username) {
        let repos = this.http.get(`http://107.167.177.146/api-public110/api/publiks?filter[where][email]=${username}`);
        return repos;
    }
}
