//Imports:	Lib Interna 
import { NgModule       	 	 } from '@angular/core';              		      
import { BrowserModule  	 	 } from '@angular/platform-browser';			
import { HttpClientModule 	 	 } from '@angular/common/http';				
import { FormsModule 		 	 } from '@angular/forms';						
import { ReactiveFormsModule 	 } from '@angular/forms';						
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';	 

//Imports:	Lib Externa 
import { CardModule			} from 'primeng/card';								
import { InputTextModule	} from 'primeng/inputtext';								
import { ButtonModule		} from 'primeng/button';
import { ToastModule		} from 'primeng/toast';
import { TableModule 		} from 'primeng/table';
import { MessageService 	} from 'primeng/api';
import { CookieService 		} from 'ngx-cookie-service';						

//Imports:	Arquivos 
import { AppRoutingModule 	} from './app-routing.module';						
import { AppComponent     	} from './app.component';							
import { LoginComponent 	} from './views/login/login.component';				
import { HomeComponent    	} from './views/home/home.component';				
import { PersonageComponent } from './views/personage/personage.component';		
import { NavbarComponent  	} from './partials/navbar/navbar.component';	

//Configuração
@NgModule({
	//Componentes	Página e TrechosCódigo
  	declarations: 	[ AppComponent, LoginComponent, HomeComponent, PersonageComponent, NavbarComponent ],

	//Imports     	LibI (Menos NgModule)|| LibE (Menos MessageService, CookieService) || Arquivo (Só Rotas) 
  	imports: 	  	[ BrowserModule, HttpClientModule, FormsModule, ReactiveFormsModule, 
					BrowserAnimationsModule, CardModule, InputTextModule, ButtonModule, 
					ToastModule, TableModule, AppRoutingModule ],
  
	//Serviços	  	PrimeNgMensagem, Cookie
	providers: 	  	[MessageService, CookieService],
  
	//Outros	
	bootstrap: 	  	[AppComponent]
})

//Habilitar: No Projeto
export class AppModule { }



