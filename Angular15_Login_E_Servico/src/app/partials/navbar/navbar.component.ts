//Imports: Libs
import { Component } from '@angular/core';				
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

//Configuração
@Component({
	selector: 'navbar-partials',						
  	templateUrl: './navbar.component.html',			
  	styleUrls: ['./navbar.component.css']			

})

//Habilitar: No Projeto
export class NavbarComponent { 
	constructor(private cookie: CookieService, private router: Router){}
	
	logout(): void {
		this.cookie.delete('USER_INFO');         
		void this.router.navigate(['/login']);    
	}
}

