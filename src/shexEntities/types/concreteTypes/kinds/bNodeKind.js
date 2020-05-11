let Type =require( '../../type');

class BNodeKind extends Type{

    getTypeName(){
        return 'bnode';
    }

    toString(){
        return 'BNODE';
    }



}


module.exports =  BNodeKind;