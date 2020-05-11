let CardinalityExactly =require( './cardinalityExactly');
let CardinalityMinLimit =require( './cardinalityMinLimit');
let CardinalityRange =require( './cardinalityRange');
let CardinalitySimple =require( './cardinalitySimple');

class CardinalityFactory{

    createCardinality(type,min,max){

        if(type == 'exactly'){
            return new CardinalityExactly(min);
        }

        if(type == 'minLimit'){
            return new CardinalityMinLimit(min);
        }

        if(type == 'range'){
            return new CardinalityRange(min,max);
        }

        return new CardinalitySimple(type);
 
    }


}


module.exports =  CardinalityFactory;