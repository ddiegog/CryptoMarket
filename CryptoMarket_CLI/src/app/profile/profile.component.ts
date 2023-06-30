import { Component, OnInit  } from '@angular/core';
import { User } from '../models/user.model';
import { DataService } from '../services/data-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiResponse } from '../models/api-response.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private dataService : DataService, private snackBar: MatSnackBar){}

  user : User = new User('',0,'');

  //editMode = false;

  ngOnInit() {
    let wallet = history.state.parameter;
    console.log('Account: ' + wallet);
    
    this.dataService.getUser(wallet)
      .subscribe( (response:ApiResponse) => {
        debugger
        if(response.error){
          this.snackBar.open(response.error, 'error');
          return;
        }
        
        this.user = new User(response.data.nick, response.data.level, response.data.image);

      }, error => {
        let e = 'There was an error during the request: ' + error.message;
        console.error(e);
        this.snackBar.open(e, 'error');
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
    

  }

}
