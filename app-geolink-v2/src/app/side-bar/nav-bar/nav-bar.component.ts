import {Component} from '@angular/core';
import { NavBarService } from 'src/app/nav-bar-service.service';
import { Router } from '@angular/router';

export class NavOption{
  item: string;
  id: number;
}

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})

export class NavBarComponent{
  
  public dashboards: NavOption[];
  public analytics: NavOption[] = [];

  public spinnerDashboard:boolean = false;
  public spinnerAnalytics:boolean = false;

  public selectDash:string;
  public selectAnaly:string;
  
  constructor(
    private navBarService: NavBarService,
    private router: Router,
    ){}

    ngOnInit(): void {
    }
    
    loadDashboard(event){
      this.spinnerDashboard  =true;
      this.navBarService.loadNavBarList('loadDashboardsList')
        .subscribe(
          resp=>{
            this.spinnerDashboard = false;
            this.dashboards = resp.map(node=>{return {id: node.id, item: node.name}});
          },
          err=>{}
        );
    }

    loadAnalytics(event){
      this.spinnerAnalytics = true;
      this.navBarService.loadNavBarList('loadAnalyticsByUserId')
      .subscribe(
        resp=>{
          if(resp){
            this.spinnerAnalytics = false;
            this.analytics = resp.map(node => {return {id: node.id, item: node.name}});
            
          }
        },
        err=>{}
      );
    }

    routeDashboard(event){
      this.router.navigate(['/dashboard/'+event.value]);
    }
    
    routeAnalytics(event){
      this.router.navigate(['/analytics/'+event.value]);
    }

    dashboardClose(){
      this.selectDash='';
    }

    analyticsClose(){
      this.selectAnaly='';
    }
  
}
