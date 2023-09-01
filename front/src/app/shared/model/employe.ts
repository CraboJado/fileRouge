import {Departement} from "./departement";

export class Employe{

  id:number=0;
firstName:string="";
lastName:string="";
password:string="";
soldeConge:number=0;
soldeRTT:number=0;
email:string="";

departements:Departement[]= []

  manager:Employe= new Employe();

roles:string[]=[];


  constructor() {
  }
}
