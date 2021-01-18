import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteModel } from '../model/model';
import { ApiService } from '../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { FormularioComponent } from '../formulario/formulario.component';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

  listaClientes: any = [];
  displayedColumns: string[] = ['nome', 'sobrenome', 'endereco', 'contato', 'editar', 'deletar'];
  dataSource: any;

  constructor(
    private apiService: ApiService,
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.buscarClientes();
  }

  public openDialog(cliente?: any) {
    const dialogRef = this.dialog.open(FormularioComponent, { data: cliente });

    dialogRef.afterClosed().subscribe(result => {
      this.buscarClientes();
    });
  }

  public deleteCliente(cliente: any) {
    this.apiService.deleteCliente(cliente)
    .subscribe(res => {
      console.log(res);
      this.buscarClientes();
    });
  }

  public buscarClientes(){
    this.apiService.getListaClientes()
    .subscribe(res => {
        this.listaClientes = res;
        this.dataSource = new MatTableDataSource<ClienteModel>(this.listaClientes);
        console.log(this.listaClientes);
    });
  }

}
