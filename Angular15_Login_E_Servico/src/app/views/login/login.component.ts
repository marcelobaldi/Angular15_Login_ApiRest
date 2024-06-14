//Imports: Libs
import { Component, OnDestroy 	 } from '@angular/core';				
import { Router 				 } from '@angular/router';				
import { Subject, takeUntil 	 } from 'rxjs';						
import { FormBuilder, Validators } from '@angular/forms';				
import { MessageService 		 } from 'primeng/api';					
import { CookieService 			 } from 'ngx-cookie-service';			

//Imports: Arquivos
import { UserService 			  } from 'src/app/services/user/user.service';				
import { Create_Request_Interface } from 'src/app/interfaces/user/Create_Request_Interface';  
import { Login_Request_Interface  } from 'src/app/interfaces/user/Login_Request_Interface';

//Configuração
@Component({
	selector: 'app-login',
  	templateUrl: './login.component.html',
  	styleUrls: ['./login.component.css']
})

//Execução
export class LoginComponent implements OnDestroy {
  	//Variáveis
  	public  loginCard = true;						
	private destroy$  = new Subject<void>();		

	//Objeto Formulário - Login
	loginForm = this.formBuilder.group({
		email: 	  ['', Validators.required],
		password: ['', Validators.required],
	});

	//Objeto Formulário - Cadastro
	signupForm = this.formBuilder.group({
		name:	  ['', Validators.required],
		email: 	  ['', Validators.required],
		password: ['', Validators.required],
	});

	//---------------------------------------------------------------------------------------------
	
	//Construtor (FormulárioCompleto, Serviços, Cookies, Mensagem Toast, Rotas-Redirecionar)
	constructor(
		private formBuilder: FormBuilder, 
		private userService: UserService,
		private cookieService: CookieService,
		private messageService: MessageService,
		private router: Router 
	) {}

	//---------------------------------------------------------------------------------------------
	
	//Método: Cadastro	(Se Sucesso, Renderização Condicional - Card Login )
	onSubmitSignupForm(): void {
		//Se Possui Valor e Se Valores Válidos 
		if (this.signupForm.value && this.signupForm.valid) {
			this.userService												
			.userCreate(this.signupForm.value as Create_Request_Interface)	
			.pipe(takeUntil(this.destroy$))									
			.subscribe({												
				//Sucesso
				next: (response) => {
					if (response) {
						//Limpar Formulário e Exibir Tela Login (Renderização Condicional)
						this.signupForm.reset();					
						this.loginCard = true;						

						//Mensagem Toast
						this.messageService.add({
							severity: 'success',
							summary: 'Sucesso',
							detail: 'Usuário criado com sucesso!',
							life: 2000,
					  	});
				  	}
				},
				//Erro
				error: (err) =>  	{
					//Mensagem Toast
					this.messageService.add({
						severity: 'error',
						summary: 'Erro',
						detail: `Erro ao criar usuário!`,
						life: 2000,
					});
					console.log(err);
				}
			});
		}
	}
	
	//Método: Login		(Se Sucesso, Redirecionar para o Sistema)
	onSubmitLoginForm():  void {
		//Se Possui Valor e Se Valores Válidos 
		if (this.loginForm.value && this.loginForm.valid) {
			this.userService											 
			.userLogin(this.loginForm.value as Login_Request_Interface)	 		
			.pipe(takeUntil(this.destroy$))								 
			.subscribe({												
				//Sucesso
				next: (response) => {
					if (response) {
						//Add no Cookie os Dados (? É um Validador para se tiver dados) 
						this.cookieService.set('USER_INFO', response?.token);	
						this.loginForm.reset();									
						this.router.navigate(['/home']);					
						
						//Mensagem Toast
						this.messageService.add({
							severity: 'success',
							summary: 'Sucesso',
							detail: `Bem vindo de volta ${response?.name}!`,
							life: 2000,
						});
					}
				},
				//Erro
				error: (err) => { 
					//Mensagem Toast
					this.messageService.add({
						severity: 'error',
						summary: 'Erro',
						detail: `Erro ao fazer o login!`,
						life: 2000,
					});
					//console.log(err),
					this.loginForm.reset();	//Limpar Formulário 
				}
			});
		}
	}

	//---------------------------------------------------------------------------------------------
	
	//Ciclo Vida: Quando Terminado (MudarURL, FecharAba)
	ngOnDestroy(): void {
		//Encerrar Serviços
		this.destroy$.next();
		this.destroy$.complete();
	}
}
	


