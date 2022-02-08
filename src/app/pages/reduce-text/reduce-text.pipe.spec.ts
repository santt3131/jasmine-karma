import { ReduceTextPipe } from "./reduce-text.pipe";

describe('ReducerTextPipe', ()=>{
    let pipe: ReduceTextPipe;
    
    beforeEach(()=>{
        pipe = new ReduceTextPipe();
    });

    it('Should create', ()=>{
        expect(pipe).toBeTruthy();
    });

    it('Use transform correctly', ()=>{
        const text= 'Hello this is a test to check the pipe';
        const newText = pipe.transform(text, 5);
        expect(newText.length).toBe(5);

    });

});