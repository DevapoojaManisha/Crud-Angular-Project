import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router, NavigationStart } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { combineLatest, of, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { Location } from '@angular/common';
import { SearchService } from 'src/app/shared/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private mySubscription: Subscription | undefined;
  searchQuery: string = '';
  showClearIcon: boolean = false;
  clearIcon: boolean = false;
  p: number = 1;
  itemsPerPage: number = 4;
  

  private readonly user$ = this.userService.getAllUser();
  private readonly appUser$ = this.authService.appUser$;

  userData$ = combineLatest([this.user$, this.appUser$]).pipe(
    map(([user, appUser]) => ({
      userList: user,
      appUser,
    }))
  );

  constructor(
    private userService: UserService,
    private _toast: ToastrService,
    private router: Router,
    private location: Location,
    private authService: AuthService,
     private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.disableNavigation();

    this.searchService.getSearchQuery().subscribe((query) => {
      this.searchQuery = query;

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
      } else {
        this.loadData();
      }

      this.showClearIcon = true;
    });
    
  }

  

  ngOnDestroy(): void {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }



  delete(userId: string) {
    if (confirm("Are you sure you want to delete this employee record?")) {
      this.userService.deleteUser(userId).subscribe(() => {
        this.showError();
      }, (error) => {
        console.error("Error deleting user:", error);
      });
    }
  }

  public showError(): void {
    this._toast.error('Data Has Deleted');
  }



  private disableNavigation(): void {
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.location.forward();
      }
    });
  }

  loadData() {
  this.userService.getAllUser().subscribe(users => {
    const sortedUsers = users.sort((a, b) => a.name.localeCompare(b.name));

    this.userData$ = combineLatest([of(sortedUsers), this.appUser$]).pipe(
      map(([user, appUser]) => ({
        userList: user,
        appUser,
      }))
    );
  });
}


getPages(userListLength: number, itemsPerPage: number): number[] {
  const pageCount = Math.ceil(userListLength / itemsPerPage);
  return Array.from({ length: pageCount }, (_, index) => index + 1);
}
  
}
