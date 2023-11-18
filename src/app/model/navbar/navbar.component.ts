import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/auth.service';
import { combineLatest, of } from "rxjs";
import { map } from "rxjs/operators";
import { SearchService } from 'src/app/shared/search.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
   @Input() showSearchAndAddSite: boolean = true;
  searchQuery: string = '';
  showClearIcon: boolean = false;
  clearIcon: boolean = false;
  private readonly user$ = this.userService.getAllUser();
  private readonly appUser$ = this.authService.appUser$;

  userData$ = combineLatest([this.user$, this.appUser$]).pipe(
    map(([user, appUser]) => ({
      userList: user,
      appUser,
    }))
  );

  ngOnInit(): void {
      
  }
  constructor(
    private userService: UserService,
    private _toast: ToastrService,
    private authService: AuthService,
    private searchService: SearchService 
  ) {}

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
    this.searchService.setSearchQuery(this.searchQuery);
  }

  logout() {
    this.authService.logout();
  }

  clearSearch() {
    this.searchQuery = '';
    this.showClearIcon = false;

    this.searchService.setSearchQuery('');
    this.userData$ = combineLatest([this.userService.getAllUser(), this.appUser$]).pipe(
      map(([user, appUser]) => ({
        userList: user,
        appUser,
      }))
    );
  }
}
