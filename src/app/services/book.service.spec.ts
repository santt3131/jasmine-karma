import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { environment } from "src/environments/environment.prod";
import { Book } from "../models/book.model";
import { BookService } from "./book.service";


const listCartBook: Book[] = [
    {
        name: '',
        author: '',
        isbn: '',
        price: 15,
        amount: 2
    },
    {
        name: '',
        author: '',
        isbn: '',
        price: 20,
        amount: 1
    },
    {
        name: '',
        author: '',
        isbn: '',
        price: 8,
        amount: 7
    }

];

describe('Test Service',()=>{
    let service:BookService;
    let httpMock: HttpTestingController;
    let storage= {};

    beforeEach(()=>{
        TestBed.configureTestingModule({
          imports: [ HttpClientTestingModule]  ,
          providers: [ BookService],
          schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        });
    });

    beforeEach(()=>{
        service = TestBed.inject(BookService);
        httpMock = TestBed.inject(HttpTestingController);
        //agrego un espia para localstorage
        spyOn(localStorage, 'getItem').and.callFake((key: string)=>{
            return storage[key]? storage[key]: null;
        })
    });

    afterEach(()=>{
        httpMock.verify();
    });

    it('should be created',()=>{
        expect(service).toBeTruthy();
    });

    it('getBook return a list of book and does a get method ', ()=>{
        service.getBooks().subscribe((resp: Book[])=>{
            expect(resp).toEqual(listCartBook);//2. aqui evalue que lo que me llega es igual a listartBook
        })

        const req = httpMock.expectOne(environment.API_REST_URL + `/book`);
        expect(req.request.method).toBe('GET');
        
        //Simular la peticion http, mokeo el return de http.get
        req.flush(listCartBook);
    });


  it('getBookFromCart return empty array when localStorage is empty',()=>{
    const listBook = service.getBooksFromCart();
    //creamos el spia, pq si no se crea esta consultando al localstorageReal.
    expect(listBook.length).toBe(0);
  });

});