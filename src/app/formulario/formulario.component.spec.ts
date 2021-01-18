import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormularioComponent } from './formulario.component';
import { ApiService } from '../services/api.service';
import { Observable, of } from 'rxjs';

describe('FormularioComponent', () => {
  let component: FormularioComponent;
  let fixture: ComponentFixture<FormularioComponent>;
  let mockApiService = {
    addCliente() : Observable<any> {
      return of();
    },

    updateCliente() : Observable<any> {
      return of();
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: ApiService, useValue: mockApiService },
      ],
      imports: [
        BrowserModule, 
        FormsModule, 
        ReactiveFormsModule,
        HttpClientTestingModule,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not call addCliente whem form is invalid', () => {
    spyOn(mockApiService, "addCliente").and.returnValue(of());
    component.tratamentoCliente();
    expect(mockApiService.addCliente).not.toHaveBeenCalled();
  });

  it('should not call updateCliente whem form is invalid', () => {
    spyOn(mockApiService, "updateCliente").and.returnValue(of());
    component.tratamentoCliente();
    expect(mockApiService.updateCliente).not.toHaveBeenCalled();
  });

  it('should call addCliente whem form is valid and id is undefined', () => {
    component.form.controls['nome'].setValue('test');
    component.form.controls['sobrenome'].setValue('test');
    component.form.controls['endereco'].setValue('test');
    component.form.controls['contato'].setValue('test');
    
    spyOn(mockApiService, "addCliente").and.returnValue(of());
    component.tratamentoCliente();
    expect(mockApiService.addCliente).toHaveBeenCalled();
  });

  it('should call updateCliente whem form is valid and id is defined', () => {
    component.data.id = 'test';
    
    component.form.controls['nome'].setValue('test');
    component.form.controls['sobrenome'].setValue('test');
    component.form.controls['endereco'].setValue('test');
    component.form.controls['contato'].setValue('test');

    spyOn(mockApiService, "updateCliente").and.returnValue(of());
    component.tratamentoCliente();
    expect(mockApiService.updateCliente).toHaveBeenCalled();
  });
});
