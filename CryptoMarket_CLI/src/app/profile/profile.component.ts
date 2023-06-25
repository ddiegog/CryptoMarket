import { Component } from '@angular/core';
import { User } from '../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  user : User = new User('a',0,'');

  editMode = false;

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  onFileChange(event:any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      // Aquí podrías implementar una lógica para convertir el archivo seleccionado en un URL de imagen y asignarlo a usuario.imagen
    }
  }

  saveChanges() {
    // Aquí podrías implementar la lógica para guardar los cambios en el backend
    this.toggleEditMode();
  }

}
