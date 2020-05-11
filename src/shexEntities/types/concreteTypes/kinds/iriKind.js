let Type =require( '../../type');

class IriKind extends Type{

    getTypeName(){
        return 'iri';
    }

    toString(){
        return 'IRI';
    }



}


module.exports =  IriKind;