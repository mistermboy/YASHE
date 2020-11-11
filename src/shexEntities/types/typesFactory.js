let PrefixedIri =require('./concreteTypes/prefixedIri');
let IriRef =require('./concreteTypes/iriRef');
let BNode =require('./concreteTypes/bNode');
let BlankType =require('./concreteTypes/blankType');
let Primitive =require('./concreteTypes/primitive');
let ValueSet =require('./concreteTypes/valueSet');

let Literal =require('./concreteTypes/kinds/literal');
let NonLiteral =require('./concreteTypes/kinds/nonLiteral');
let IriKind =require('./concreteTypes/kinds/iriKind');
let BNodeKind =require('./concreteTypes/kinds/bNodeKind');


let StringLiteral =require('./concreteTypes/literal/stringLiteral');
let NumberLiteral =require('./concreteTypes/literal/numberLiteral');
let BooleanLiteral =require('./concreteTypes/literal/booleanLiteral');



class TypesFactory{

    createType(type){

        let retType;
        if(type == 'iriRef'){
            retType = new IriRef();
        }
        
        if(type == 'prefixedIri'){
            retType = new PrefixedIri();
        }
        
        if(type == 'bnodeType'){
            retType = new BNode();
        }

        if(type == 'blankType'){
            retType = new BlankType();
        }

        if(type == 'primitive'){
            retType = new Primitive();
        }

        if(type == 'literal'){
            retType = new Literal();
        }

        if(type == 'nonliteral'){
            retType = new NonLiteral();
        }


        if(type == 'iri'){
            retType = new IriKind();
        }

        if(type == 'bnode'){
            retType = new BNodeKind();
        }

        if(type == 'valueSet'){
            retType = new ValueSet();
        }

        if(type == 'stringLiteral'){
            retType = new StringLiteral();
        }

        if(type == 'numberLiteral'){
            retType = new NumberLiteral();
        }

        if(type == 'booleanLiteral'){
            retType = new BooleanLiteral();
        }
 

        return retType;

    }


}


module.exports =  TypesFactory;