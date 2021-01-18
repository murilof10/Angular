import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ListaComponent } from './lista.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { Observable, of } from 'rxjs';

describe('ListaComponent', () => {
  let component: ListaComponent;
  let fixture: ComponentFixture<ListaComponent>;

  let mockApiService = {
    getListaClientes() : Observable<any> {
      return of(mockHttp);
    },

    deleteCliente() : Observable<any> {
      return of();
    }
  }

  const mockHttp = [
    {
      "nome": "Localstack",
      "sobrenome": "Local",
      "endereco": "Rua A, numero 1",
      "contato": "11 91111-1111",
      "id": "a4313fb7-ae28-43cb-bd1f-c5f475503154"
    },
    {
      "nome": "AWS",
      "sobrenome": "S3",
      "endereco": "Rua B, numero 2",
      "contato": "22 92222-2222",
      "id": "e1f2cc63-3e96-41d3-aaa0-3d53095fa69d"
    },
    {
      "nome": "Angular",
      "sobrenome": "Bootstrap",
      "endereco": "Rua C, numero 3",
      "contato": "33 93333-3333",
      "id": "2feceb86-b9c4-42f6-912b-4adad9bd56ad"
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ 
        HttpClientTestingModule,
        MatDialogModule,
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: ApiService, useValue: mockApiService },
      ],
      declarations: [ ListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get a list of clients', () => {
    component.buscarClientes();
    expect(component.listaClientes).toBe(mockHttp);
  });

  it('should call deleteCliente', () => {
    spyOn(mockApiService, "deleteCliente").and.returnValue(of());
    component.deleteCliente(mockHttp[0]);
    expect(mockApiService.deleteCliente).toHaveBeenCalled();
  });
});
