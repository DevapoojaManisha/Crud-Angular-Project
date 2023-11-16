import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service'; 
import { User } from 'src/app/user';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/auth.service';


@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css']
})
export class UserformComponent implements OnInit {
  userForm!: FormGroup;
  submitted = false;
  isEdit = false; 
  userId: string='';

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private _toast: ToastrService,
              private authService:AuthService
              ) { }

              ngOnInit() {
                this.userForm = this.formBuilder.group({
                  userId: [''],
                  name: ['', Validators.required],
                  phone: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
                  email: ['', [Validators.required, Validators.email]],
                  website: ['', [Validators.required, Validators.maxLength(100), Validators.pattern('^www\\..*\\..*')]],
                  password: ['', [Validators.required, Validators.minLength(6)]],
                });

                this.route.params.subscribe(params => {
                  this.userId = params['id'];
                  if (this.userId) {
                    this.isEdit = true; // We are in edit mode
                    this.userService.getUserId(this.userId).subscribe(user => {
                      if (user) {
                        // Populate the form with the user's data
                        this.userForm.setValue({
                          userId: user.id,
                          name: user.name,
                          phone: user.phone,
                          email: user.email,
                          website: user.website,
                          password:user.password
                        });
                      }
                    });
                  }
                });
              }
  
  
            






  

              onSubmit() {
                this.submitted = true;
                const user: User = this.userForm.value;
            
                if (this.userForm.invalid) {
                  return;
                } else {
                  if (this.isEdit) {
                    this.userService.update(this.userId, user).then(() => {
                      this.showSuccess('Site Data Successfully Updated', user.name);
                      this.router.navigate(['home']);
                    });
                  } else {
                    this.userService.saveUser(user).then(() => {
                      this.showSuccess('Site Data Successfully Added', user.name);
                      this.router.navigate(['home']);
                    });
                  }
                }
              }
            
              showSuccess(message: string, username: string): void {
                this._toast.success(message, username);
              }
            
              cancelEdit() {
                this.router.navigate(['home']);
              }
  
  
  logout() {
    this.authService.logout();
  }

}
