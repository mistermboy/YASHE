let Type =require( '../type');

class BlankType extends Type{

     constructor(value=''){
        super(value);
    }

    getTypeName(){
        return 'blankType';
    }

    toString(){
        return '';
    }



}


module.exports =  BlankType;