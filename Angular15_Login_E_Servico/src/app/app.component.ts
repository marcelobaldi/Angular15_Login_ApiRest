//Imports: Libs
import { Component 	   }  from '@angular/core';       
import { PrimeNGConfig }  from 'primeng/api';         	

//Configuração
@Component({
  	selector: 'component-initial',						
  	templateUrl: './app.component.html',				
  	styleUrls: ['./app.component.css']					
})

//Habilitar: No Projeto
export class AppComponent {
	//Variáveis
	title = 'BootStrap, PrimeNG, Serviço';

	//Construtor (FrameWork PrimeNG)
	constructor(
		private framePrimeNG: PrimeNGConfig			
	){}

	//Ciclo Vida: Inicial
	ngOnInit(): void {
		this.framePrimeNG.ripple = true;				
	}	
}



