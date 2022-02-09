import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NavComponent } from "./nav.component";
import { RouterTestingModule } from "@angular/router/testing";
import { HomeComponent } from "../pages/home/home.component";
import { CartComponent } from "../pages/cart/cart.component";
import { Router } from "@angular/router";

class ComponentTestRouter {}

fdescribe(`Nav component`,()=>{
    let component: NavComponent;
    let fixture:ComponentFixture<NavComponent>;
    
    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports:[
                RouterTestingModule.withRoutes([
                    {
                        path: 'home',
                        component: ComponentTestRouter
                    },
                    {
                        path: 'cart',
                        component: ComponentTestRouter
                    }
                ])
            ],
            declarations:[
                NavComponent
            ],
            providers:[],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    beforeEach(()=>{
        fixture = TestBed.createComponent(NavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create',()=>{
        expect(component).toBeTruthy();
    });

    it('should navigate',()=>{
        const router = TestBed.inject(Router);
        const spy1 = spyOn(router, 'navigate');
        component.navTo('home');
        expect(spy1).toHaveBeenCalledOnceWith(['/home'|| '/cart']);
    });
    //otra manera puede ser mockeando un servicio.
    
});