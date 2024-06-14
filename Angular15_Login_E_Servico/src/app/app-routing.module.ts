//Imports: Libs e Arquivos
import { NgModule             } from '@angular/core';                  	      
import { RouterModule, Routes } from '@angular/router';               	      
import { HomeComponent        } from './views/home/home.component';  	      
import { LoginComponent 	  } from './views/login/login.component';			
import { PersonageComponent   } from './views/personage/personage.component';	
import { RoutesGuardService   } from './guards/routes-guard.service';			

//Rotas
const routes: Routes = [
	//Rotas - Sem Guardião
	{ path:'', 		redirectTo: 'home', pathMatch: 'full'	},		
	{ path:'login', component: LoginComponent 	   			},		
	
	//Rotas - Com Guardião
	{ path:'home', 				 component: HomeComponent, 		canActivate:[RoutesGuardService] },	
	{ path:'personage/:id_rota', component: PersonageComponent,	canActivate:[RoutesGuardService] },	
];

//Configuração
@NgModule({
  	imports: [RouterModule.forRoot(routes)],
  	exports: [RouterModule]
})

//Habilitar: No Projeto
export class AppRoutingModule { }



