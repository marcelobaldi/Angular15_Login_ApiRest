//Imports: Libs e Arquivos
import { Router, UrlTree  } from '@angular/router';                    
import { Injectable       } from '@angular/core';                   
import { Observable       } from 'rxjs';                               
import { UserService      } from 'src/app/services/user/user.service';

//Construtor
@Injectable( {providedIn: 'root'} )
	
//Executar
export class RoutesGuardService {
	//Variáveis
	// ...

	//Construtor
	constructor(
		private userService: UserService, 
		private router: Router
	) {}

	//Método
	canActivate():| Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		//Se Não Logado, Então Redirecionar Para Rota Login
		if (!this.userService.isUserLogged()) {
	   		this.router.navigate(['/login']);
	   		return false;
	 	}
 
		//Se Logado, Então Retornar Ok
	 	this.userService.isUserLogged();
	 	return true;
   }
}
