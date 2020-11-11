let Type =require( '../../type');

class Literal extends Type{

    getTypeName(){
        return 'literal';
    }

    toString(){
        return 'Literal';
    }



}


module.exports =  Literal;