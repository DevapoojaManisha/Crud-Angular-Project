import { Component ,OnInit} from '@angular/core';
import { User } from 'src/app/user'; 
import { UserService } from 'src/app/shared/user.service'; 
import { ToastrService } from 'ngx-toastr';
import{Router} from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { combineLatest,of } from "rxjs";
import { map } from "rxjs/operators";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchQuery: string = '';
  showClearIcon: boolean = false; 

  private readonly user$ = this.userService.getAllUser();
 private readonly appUser$ = this.authService.appUser$;
 //private readonly appUser$: Observable<User | null> = this.authService.appUser$;



  userData$ = combineLatest([this.user$, this.appUser$]).pipe(
    
    map(([user, appUser]) => ({
      
      userList: user,
      appUser,
    }))
    
  );
  constructor(private userService:UserService,
    private _toast:ToastrService,
    private router:Router,
    private authService : AuthService){}
ngOnInit(): void {



}


delete(userId: string) {
if (confirm("Are you sure you want to delete this employee record?")) {
this.userService.deleteUser(userId).subscribe(
() => {
this.showError();
},
(error) => {
// Handle any potential errors here
console.error("Error deleting user:", error);
}
);
}
}

public showError():void{
this._toast.error('Data Has Deleted');
}

search() {
if (this.searchQuery.trim() !== '') {
this.userService.getAllUser().subscribe((data) => {
const searchQuery = this.searchQuery.toLowerCase().trim();
const filteredUsers = data.filter((user) =>
user.name.toLowerCase().includes(searchQuery)
);

this.userData$ = combineLatest([of(filteredUsers), this.appUser$]).pipe(
map(([user, appUser]) => ({
  userList: user,
  appUser,
}))
);
});
}
  this.showClearIcon = true;

}


clearSearch() {
  this.searchQuery = '';
  this.showClearIcon = false;
this.userData$ = combineLatest([this.userService.getAllUser(), this.appUser$]).pipe(
map(([user, appUser]) => ({
userList: user,
appUser,
}))
);
}

}
