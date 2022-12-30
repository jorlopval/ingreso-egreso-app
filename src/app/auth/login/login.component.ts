import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor( private fb: FormBuilder,
               private authService: AuthService,
               private router: Router ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email ] ],
      password: ['', Validators.required ],

    })
  }

  loginarUsuario(){


    if ( this.loginForm.invalid ) { return; }


    Swal.fire({
      title: 'Espere por favor',
      didOpen: () => {
        Swal.showLoading(Swal.getDenyButton());
      }
    })

    const { email, password} = this.loginForm.value;

    this.authService.loginUsuario( email, password )
       .then( credenciales => {
       console.log(credenciales);
       Swal.close();
       this.router.navigate(['/']);
       })
       .catch( err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message
        })
       });


  }



}
