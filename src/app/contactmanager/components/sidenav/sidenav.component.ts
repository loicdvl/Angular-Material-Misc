import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.sass']
})
export class SidenavComponent implements OnInit {

  public isScreenSmall: boolean = false;
  isDarkTheme: boolean = false;

  users!: Observable<User[]>;

  constructor(private breakPointObserver: BreakpointObserver,
    private userService: UserService,
    private router: Router) { }

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  ngOnInit(): void {
    this.breakPointObserver
    .observe([
      //Breakpoints.XSmall
      `(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`
    ])
    .subscribe((state: BreakpointState) => {
      this.isScreenSmall = state.matches;
    });

    this.users = this.userService.getUsers();
    this.userService.loadAll();

    this.router.events.subscribe(() => {
      if(this.isScreenSmall) {
        this.sidenav.close();
      }
    });
  }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
  }
}
