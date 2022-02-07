import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CartComponent } from "./cart.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { BookService } from "src/app/services/book.service";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { Book } from "src/app/models/book.model";

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

describe('Cart Component', () => {
    let fixture: ComponentFixture<CartComponent>;// por ejemplo en el componente estoy usando un servicio para ello se usa el fixture.
    let component: CartComponent;
    let service: BookService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule //simula peticiones reales con httpClient
            ],
            declarations: [CartComponent],
            providers: [
                BookService
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    beforeEach(() => {
        //tenemos que instanciar el componente, para ello ayuda el fixture
        fixture = TestBed.createComponent(CartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();//entrará por ngOnInit
        service = fixture.debugElement.injector.get(BookService); // o tambien TestBed.inject(BookService)
        spyOn(service,'getBooksFromCart').and.callFake(()=> listCartBook);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    //diferencia de metodos que devuelvan return con los que no devuelvan nada
    //TEST con return
    it('get TotalPrice return amount', () => {
        const totalprice = component.getTotalPrice(listCartBook);
        expect(totalprice).toBeGreaterThan(0);
        expect(totalprice).not.toBe(null);
    });

    //TEST sin return
    it('onInputNumberChange increments correctly - no return',()=>{
        const action = 'plus';
        const book =   {
            name: '',
            author: '',
            isbn: '',
            price: 15,
            amount: 2
        };
        //los spy estan para saber si un metodo ha sido llamado o no.
        //necesitaremos el servicio, se creo arriba
        const spy1 = spyOn(service,'updateAmountBook').and.callFake(()=>null);
        const spy2 = spyOn(component, 'getTotalPrice').and.callFake(()=>null);
        //Es decir realiza la llame y crea una llamada falsa
        //el espia verifica que se llama al este metodo, pero que no lo llame de verdad
        //TEST UNITARIO NO TIENE QUE LLAMAR A SERVICIO REALES.
        expect(book.amount).toBe(2);//verificando incremento
        component.onInputNumberChange(action, book);

        expect(book.amount).toBe(3);//verificando incremento
        expect(spy1).toHaveBeenCalled();
        expect(spy2).toHaveBeenCalled();
    });
        
    it('onInputNumberChange decrement correctly - no return',()=>{
        const action = 'minus';
        const book =   {
            name: '',
            author: '',
            isbn: '',
            price: 15,
            amount: 3
        };
        expect(book.amount).toBe(3);

        //los spy estan para saber si un metodo ha sido llamado o no.
        //necesitaremos el servicio, se creo arriba
        const spy1 = spyOn(service,'updateAmountBook').and.callFake(()=>null);
        const spy2 = spyOn(component, 'getTotalPrice').and.callFake(()=>null);
        //Es decir realiza la llame y crea una llamada falsa
        //el espia verifica que se llama al este metodo, pero que no lo llame de verdad
        //TEST UNITARIO NO TIENE QUE LLAMAR A SERVICIO REALES.
        component.onInputNumberChange(action, book);

        expect(book.amount).toBe(2);
        expect(spy1).toHaveBeenCalled();
        expect(spy2).toHaveBeenCalled();
    });


    //PROBANDO metodo privado por medio de un publico

    /*public onClearBooks(): void {
        if (this.listCartBook && this.listCartBook.length > 0) {
          this._clearListCartBook();
        } else {
           console.log("No books available");
        }
      }
    
      private _clearListCartBook() {
        this.listCartBook = [];
        this._bookService.removeBooksFromCart();
      }*/

      it('onClearBooks correctly- public method call private', ()=>{
        //el espia siempre se llama antes de llamar al metodo
        const spy1 = spyOn((component as any), '_clearListCartBook').and.callThrough();//para espiar un metodo privado as any
        const spy2 = spyOn(service,'removeBooksFromCart').and.callFake(()=> null);
        
        //calltrough aqui realmente se llama. no es un face.
        component.listCartBook = listCartBook;
        component.onClearBooks();
        expect(component.listCartBook.length).toBe(0);
        expect(spy1).toHaveBeenCalled();
        expect(spy2).toHaveBeenCalled();
      });

      it('_clearListCartBook correctly- private call', ()=>{
        const spy1= spyOn(service, 'removeBooksFromCart').and.callFake(()=> null);
        component.listCartBook = listCartBook;
        component["_clearListCartBook"]();

        expect(component.listCartBook.length).toBe(0);
        expect(spy1).toHaveBeenCalled();
      });

});