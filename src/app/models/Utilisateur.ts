
import { District } from "./district";
import { Role } from "./Role";

export interface Utilisateur {
  id?: number;
  ppr?: string;
  nom?: string;
  prenom?: string;
  fonction?: string;
  username?: string;
  email?: string;
  password?: string;
  tel?: string;
  genre?: string;
  adresse?: string;
  dateDeNaissance?: Date;
  // tokens: Token[];
  idRole: Role;
  district: District;
}


