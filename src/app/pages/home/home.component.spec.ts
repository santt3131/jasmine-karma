import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Pipe, PipeTransform } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { Book } from "src/app/models/book.model";
import { BookService } from "src/app/services/book.service";
import { HomeComponent } from "./home.component";


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

const bookServiceMock = {
    getBooks: ()=> of(listCartBook)
}

//testeando un pipe-test unit

@Pipe({name: 'reduceText'})
class ReduceTextPipeMock implements PipeTransform{
    transform():string{
        return '';
    }
}

describe('Home component', ()=>{
    let fixture: ComponentFixture<HomeComponent>;
    let component:HomeComponent;
    
    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations:[ HomeComponent, ReduceTextPipeMock ],//add the pipemock
            providers:[ 
                //BookService
                {
                    provide: BookService,
                    useValue: bookServiceMock
                }
            ],
            schemas:[ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
        }).compileComponents();
    })

    beforeEach(()=>{
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', ()=>{
        expect(component).toBeTruthy();
    });


    it('getBook get books from the subscription',()=>{
        //const bookService = fixture.debugElement.injector.get(BookService);
        //tambien const bookService =  TestBed.inject(BookService);
        //const spy1= spyOn(bookService, 'getBooks').and.returnValue(of(listCartBook));
        component.getBooks();
        //expect(spy1).toHaveBeenCalled();
        expect(component.listBook.length).toBe(3);
    });

});