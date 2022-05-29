import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ApiService} from "../service/api.service";
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {


  sociosForm !: FormGroup;
  actionButton : string = "Guardar"
  constructor(private formBuilder: FormBuilder,
              private api : ApiService,
              @Inject(MAT_DIALOG_DATA) public editData : any,
              private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.sociosForm = this.formBuilder.group({
      Nombre : ['', Validators.required],
      Apellidos : ['', Validators.required],
      Socio : ['', Validators.required],
      DNI : ['', Validators.required],
      Telefono : ['', Validators.required],
      Sexo : ['', Validators.required],
    });

    if(this.editData){
      this.actionButton = "Update";
      this.sociosForm.controls['Nombre'].setValue(this.editData.Nombre);
      this.sociosForm.controls['Apellidos'].setValue(this.editData.Apellidos);
      this.sociosForm.controls['Socio'].setValue(this.editData.Socio);
      this.sociosForm.controls['DNI'].setValue(this.editData.DNI);
      this.sociosForm.controls['Telefono'].setValue(this.editData.Telefono);
      this.sociosForm.controls['Sexo'].setValue(this.editData.Sexo);
    }

  }
  addSocio(){
    if(!this.editData) {
      if(this.sociosForm.valid){
        this.api.postSocio(this.sociosForm.value)
          .subscribe({
            next:(res)=>{
              alert("Socio registrado con éxito");
              this.sociosForm.reset();
              this.dialogRef.close('Guardar');
            },
            error:()=>{
              alert("Error al registrar el usuario")
            }
          })
      }

    }else{
      this.updateSocio()
    }
  }

  updateSocio(){
    this.api.putSocio(this.sociosForm.value, this.editData.id)
      .subscribe({
        next:(res)=>{
          alert("Los datos del socio han sido actualizdos con éxito.");
          this.sociosForm.reset();
          this.dialogRef.close('update');
        },
        error:()=>{
          alert('Ha habido un error durante la actualización.');
        }
      })

  }

}
