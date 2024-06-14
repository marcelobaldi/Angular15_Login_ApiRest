//Imports: Libs
import { HttpClient    } from '@angular/common/http';     	
import { CookieService } from 'ngx-cookie-service';			
import { Injectable    } from '@angular/core';				
import { Observable    } from 'rxjs';						

//Imports: Arquivos
import { environment 			  } from 'src/env/environment_local';							
import { Create_Request_Interface } from 'src/app/interfaces/user/Create_Request_Interface';	
import { Create_Response_Interface} from 'src/app/interfaces/user/Create_Response_Interface';		
import { Login_Request_Interface  } from 'src/app/interfaces/user/Login_Request_Interface';		
import { Login_Response_Interface } from 'src/app/interfaces/user/Login_Response_Interface';	

//Escopo
@Injectable( {providedIn: 'root'} )				

//Executar
export class UserService {
	//Variáveis
	private API_URL = environment.API_URL;        	

	//Construtor
  	constructor(
		private http:   HttpClient,
		private cookie: CookieService
	) {}     

	//Cadastrar Usuário (POST). Envia Interface Requisição e Recebe Interface Resposta
	userCreate(send_Datas: Create_Request_Interface): Observable<Create_Response_Interface> {
		return this.http.post<Create_Response_Interface>(
			`${this.API_URL}/user`, send_Datas
		);
	}

	//Logar Usuário 	(Post).	Envia Interface Requisição e Recebe Interface Resposta		
	userLogin(send_Datas: Login_Request_Interface): Observable<Login_Response_Interface> {
		return this.http.post<Login_Response_Interface>(`${this.API_URL}/auth`, send_Datas);
	}

	//Verificar Logado: Se Usuário esta logado (Via Token no Cookie do Browser)
	isUserLogged(): boolean {
		const JWT_TOKEN  = this.cookie.get('USER_INFO');     //Cookie: Pegar Valores
		return JWT_TOKEN ? true : false;
	}
}




