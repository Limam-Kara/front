import { Categorie } from "./categorie";
import { District } from "./district";
import { Annexe } from 'src/app/models/annexe';
import { Utilisateur } from "./Utilisateur";

export class Endroit {
    id!:number;
    nom!:string;
    latitude!:number;
    longitude!:number;
    district!:District;
    annexe!:Annexe;
    categorie!:Categorie
    utilisateur!:Utilisateur
  }
