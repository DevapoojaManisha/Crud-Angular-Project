import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router, NavigationStart } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { combineLatest, of, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { Location } from '@angular/common';

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
  itemsPerPage: number = 10;

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
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.disableNavigation();
  }

  ngOnDestroy(): void {
    // Unsubscribe from router events to avoid memory leaks
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  logout() {
    this.authService.logout();
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
    this.userData$ = combineLatest([this.userService.getAllUser(), this.appUser$]).pipe(
      map(([user, appUser]) => ({
        userList: user,
        appUser,
      }))
    );
  }
}
