let Node =require( './node');

let CardinalityFactory =require( './others/cardinality/cardinalityFactory');
let CardinalitySimple =require( './others/cardinality/cardinalitySimple');
let PrefixedIri =require( './types/concreteTypes/prefixedIri');
let Primitive =require( './types/concreteTypes/primitive');
let ShapeRef =require( './others/shapeRef');
let Prefix =require( './others/prefix');
let {getLongestElements,getSeparators,getSeparator} =require( '../utils/printUtils');

class Triple extends Node{

    constructor(id,type=new PrefixedIri(new Prefix('schema','http://schema.org/')),constraint=new Primitive(),facets=[],shapeRef=new ShapeRef(),cardinality=new CardinalitySimple(),triples=[]) {
        super(id,type,constraint,facets,shapeRef,triples);
        this.cardinality = cardinality;
        this.cardFactory = new CardinalityFactory();
    }
      

    setCardinality(cardinality,min,max){
        this.cardinality = this.cardFactory.createCardinality(cardinality,min,max);
    }


    toString(separators,tab){
        let str='';
        let type=this.type;
        let constraint = this.constraint;
        let facets = this.facets;
        let shapeRef = this.shapeRef;
        let cardinality = this.cardinality;
        separators = this.checkPrettyOptions(separators);
        let tripleSeparator = separators.type; 
        let bodySeparator = separators.body;
        let cardSeparator = separators.card;
 
        if(type.value!=''){
            str+=getSeparator(tab);
            str+= type+tripleSeparator;
            str+= this.checkConstraint();
            if(facets){
                 str+=facets.reduce((acc,f)=>{
                    return acc+=' '+f+' ';
                },'');
            }
           

            str+=shapeRef+bodySeparator;

            if(this.triples.length>0){
                str+=' {\n';
                tab++;
                str+=this.triples.reduce((acc,t) => {
                    return acc+=t.toString(getSeparators(t,getLongestElements(this.triples)),tab);
                },'');
                str+=getSeparator(tab-1)+'}';
            }

            str+=cardinality+cardSeparator+';\n';

        }

        return str;

    }




    checkPrettyOptions(separators){

       /*  if(DEFAULTS.pretty=='none'){
            separators.type=' ';
            separators.body=' ';
        }
        if(DEFAULTS.pretty=='pretty1'){
            separators.body=' ';
        } */
        //default pretty2
        return separators;
    }

    checkConstraint(){
    
        // If there is no constraint
        if(this.constraint.getTypeName()=='primitive' 
                && this.constraint.value=='none'){
        
            // If there are facets don't print the '.'
            if(this.facets.length>0)return '';
            // If there is a shapeRef don't print the '.'
            if(this.shapeRef.shape != null) return '';    
            // If there is a inline shape don't print the '.'
            if(this.triples.length>0)return '';
        
        }


        return this.constraint+' ';
    }


    getEntityName(){
      return 'Triple';
    }


}


module.exports =  Triple;