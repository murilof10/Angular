import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<FormularioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    fb: FormBuilder,
    private apiService: ApiService,
  ) {
    this.form = fb.group({
      nome: new FormControl(this.data?.nome, Validators.required),
      sobrenome: new FormControl(this.data?.sobrenome, Validators.required),
      endereco: new FormControl(this.data?.endereco, Validators.required),
      contato: new FormControl(this.data?.contato, Validators.required),
    });
  }

  ngOnInit(): void {}

  tratamentoCliente() {
    if(this.form.valid) {
      //NOVO CLIENTE
      if(this.data === undefined){
        this.data = {};
      }

      this.data.nome = this.form.get('nome')?.value;
      this.data.sobrenome = this.form.get('sobrenome')?.value;
      this.data.endereco = this.form.get('endereco')?.value;
      this.data.contato = this.form.get('contato')?.value;

      if (this.data.id != null && this.data.id != undefined) {
        this.atualizarCliente();
      } else {
        this.cadastrarCliente();
      }
    }
  }

  cadastrarCliente() {
    this.data.id = Guid.newGuid();
    
    this.apiService.addCliente(this.data)
    .subscribe(res => {
      console.log(res);
      this.dialogRef.close();
    });
  }

  atualizarCliente() {  
    this.apiService.updateCliente(this.data)
    .subscribe(res => {
      console.log(res);
      this.dialogRef.close();
    });
  }

}

// GUID GENERATOR
class Guid {
  static newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}