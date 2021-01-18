import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ClienteModel } from '../model/model';
import { catchError, tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ApiService {

    private endpoint = 'http://localhost:3000/clientes';

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        private http: HttpClient,
    ) { }

    getListaClientes(): Observable<ClienteModel[]> {
        return this.http.get<ClienteModel[]>(`${this.endpoint}`).pipe(
            tap(_ => this.log('fetched clientes')),
            catchError(this.handleError<ClienteModel[]>('getListaClientes', []))
        );
    }

    addCliente(cliente: ClienteModel): Observable<ClienteModel> {
        return this.http.post<ClienteModel>(`${this.endpoint}`, cliente, this.httpOptions)
            .pipe(
                tap((newCliente: ClienteModel) => this.log(`added cliente w/ id=${newCliente.id}`)),
                catchError(this.handleError<ClienteModel>(`addCliente id=${cliente.id}`))
            );

    }

    deleteCliente(cliente: ClienteModel | string): Observable<ClienteModel> {
        const id = typeof cliente === 'string' ? cliente : cliente.id;

        return this.http.delete<ClienteModel>(`${this.endpoint}/${id}`, this.httpOptions).pipe(
            tap(_ => this.log(`deleted cliente id=${id}`)),
            catchError(this.handleError<ClienteModel>('deleteCliente'))
        );
    }

    updateCliente(cliente: ClienteModel): Observable<ClienteModel> {
        return this.http.put<ClienteModel>(`${this.endpoint}/${cliente.id}`, cliente, this.httpOptions)
        .pipe(
            tap(_ => this.log(`updated cliente id=${cliente.id}`)),
            catchError(this.handleError<ClienteModel>('updateCliente'))
        );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
          console.error(error);
      
          this.log(`${operation} failed: ${error.message}`);
      
          return of(result as T);
        };
    }

    private log(message: string) {
        console.log(message);
    }
}