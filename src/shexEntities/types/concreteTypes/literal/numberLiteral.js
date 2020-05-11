let Type =require( '../../type');

class NumberLiteral extends Type{

    constructor(value=0){
        super(value);
    }

    getTypeName(){
        return 'numberLiteral';
    }

    toString(){
        return this.value;
    }



}


module.exports =  NumberLiteral;