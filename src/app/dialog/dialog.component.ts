import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  stateList=["Fresh","Brand New","Refurbished","Second Hand"]
  //create a form OF formgroup
  productForm ! :FormGroup
  actionBtn : string= "Save"
  constructor(private FormBuilder:FormBuilder,
    private api:ApiService ,
    @Inject(MAT_DIALOG_DATA) public  editData:any,
    private dialogRef:MatDialogRef<DialogComponent>,
    
    ) { }

  ngOnInit(): void {
     this.productForm=this.FormBuilder.group({
  productName: ['',Validators.required],
  category: ['',Validators.required],
  state: ['',Validators.required],
  price: ['',Validators.required],
  description: ['',Validators.required],
  date: ['',Validators.required]
})
if(this.editData){ 
  this.actionBtn="Update"
  this.productForm.controls['productName'].setValue(this.editData.productName);
  this.productForm.controls['category'].setValue(this.editData.category);
  this.productForm.controls['state'].setValue(this.editData.state);
  this.productForm.controls['price'].setValue(this.editData.price);
  this.productForm.controls['description'].setValue(this.editData.description);
  this.productForm.controls['date'].setValue(this.editData.date);
}

  }
  addProduct(){
  if(!this.editData){
      //if the productform is valid,then post the value of the form
      if(this.productForm.valid){
        this.api.postProduct(this.productForm.value)
        .subscribe({
          //if it is a success it will run the next block
          next:(res)=>{
        alert("product added successfully")
        
          },
          error:(e)=>{
            alert(e.message)
            console.log("error:",e);
            
          }
        })
        }
  }else{
    this.updateProduct()
  }



  }
  updateProduct(){
    this.api.putProduct(this.productForm.value,this.editData.id)
    .subscribe({
      next:()=>{
        alert("product updated successfully")
        this.productForm.reset()
        this.dialogRef.close('update')
      },
      error:()=>{
        alert("error while updating")
      }
    })
  }
}
//function updateProduct() {
  //throw new Error('Function not implemented.')
//}

