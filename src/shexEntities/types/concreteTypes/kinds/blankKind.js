let Type =require( '../../type');

class BlankKind extends Type{

    getTypeName(){
        return 'blank';
    }

    toString(){
        return '';
    }



}


module.exports =  BlankKind;