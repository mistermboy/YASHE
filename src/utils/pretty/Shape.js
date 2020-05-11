class Shape {

    constructor(value="",before,triples){
        this.value = value;
        this.triples = triples;
    }

    toString(){
        return this.value+" {"+this.triples;
    }
}