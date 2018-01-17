import {Injectable} from "@angular/core";
import {Http, Response,Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/Rx";
import {IPosts} from "../posts";
import { IUser } from "../user";

@Injectable()
export class UserService {

    private _postsURL = "http://localhost:5555/posts";
    private _userURL = "http://localhost:5555/users";

    constructor(private http: Http) {
    }

    getPosts(): Observable<IPosts[]> {
        return this.http
            .get(this._postsURL)
            .map((response: Response) => {
                return <IPosts[]>response.json();
            })
            .catch(this.handleError);
    }

    getUser(): Observable<IUser[]> {
        console.log('Enter');
        return this.http
            .get(this._userURL)
            .map((response: Response) => {
                return <IPosts[]>response.json();
            })
            .catch(this.handleError);
    }

    addPosts(post: any): Observable<IPosts[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = post;
        return this.http.post(this._postsURL, body, options )
            .map((res: Response) => {
                return res.json()
            } 
        );
    }

    editPosts(post: any, id: number): Observable<IPosts[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = post;
        return this.http.put(this._postsURL + '/' + id, body, options )
            .map((res: Response) => {
                return res.json()
            } 
        );
    }

    deletePosts(id: number) {
        console.log('Url: ', this._postsURL + '/' + id);
        return this.http.delete(this._postsURL + '/' + id)
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}