import { Component, OnInit  } from '@angular/core';
import { User } from '../models/user.model';
import { DataService } from '../services/data-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiResponse } from '../models/api-response.model';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private dataService : DataService, private commonService: CommonService){}

  user : User = new User('', '', 0, '', '', 0,);
  isLoading : boolean = false;

  //editMode = false;

  ngOnInit() {
    let wallet = history.state.parameter;
    console.log('Account: ' + wallet);
    
    this.dataService.getUser(wallet)
      .subscribe( (response:ApiResponse) => {
        if(response.error){
          this.commonService.openSnackBar(response.error, 'error');
          return;
        }
        
        this.user = response.data;

      }, error => {
        let e = 'There was an error during the request: ' + error.message;
        console.error(e);
        this.commonService.openSnackBar(e, 'error');
      });
  }

  // toggleEditMode() {
  //   this.editMode = !this.editMode;
  // }

  onFileChange(event:any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      // Aquí podrías implementar una lógica para convertir el archivo seleccionado en un URL de imagen y asignarlo a usuario.imagen
    }
  }

  saveChanges() {
    //this.toggleEditMode();
    this.isLoading = true;
    this.dataService.updateUser(this.user)
      .subscribe( (response:ApiResponse) => {
        if(response.error){
          this.commonService.openSnackBar(response.error, 'error');
          return;
        }

        this.isLoading = false;
        this.commonService.openSnackBar('User updated successfully', 'success');
        this.commonService.setCurrentUser(response.data);

      }, error => {
        this.isLoading = false;
        let e = 'There was an error during the request: ' + error.message;
        console.error(e);
        this.commonService.openSnackBar(e, 'error');
      });

  }

}
