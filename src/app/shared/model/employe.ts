import {Departement} from "./departement";

export interface Employe{

  id?:number;
firstName?:string;
lastName?:string;
password?:string;
soldeConge?:number;
soldeRTT?:number;
email?:string;

departements?:Departement[]

  manager?:Employe;

roles?:string[];

}
