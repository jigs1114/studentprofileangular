import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';


@Injectable()
export class Global {
    
    public static readonly baseAPIUrl: string = 'http://localhost:53646/api/';
    public static readonly baseFileUrl: string = 'http://localhost:53646/';

    public static readonly httpOptions = {
			headers: new HttpHeaders({
				'Content-Type':  'application/json'
			})
	  };
	  public static readonly ItemsPerPage: number = 50; 
}