import { Component, OnDestroy, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { NavData } from "../../_nav";
import { AuthenticationService } from "../../_services/authentication.service";
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-dashboard",
  templateUrl: "./default-layout.component.html"
})
export class DefaultLayoutComponent implements OnDestroy {
  public navItems: NavData[] = [];

  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  public isLoading = true;
  loading = false;

  constructor(
    @Inject(DOCUMENT) _document?: any,
    protected authenticationService?: AuthenticationService,
    private router?: Router,
    private toaster?: ToastrService
  ) {
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          //this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });

    this.isLoading = false;

    if (!localStorage.getItem("userToken")) router.navigate(["/login"]);

    this.changes = new MutationObserver(mutations => {
      this.sidebarMinimized = _document.body.classList.contains(
        "sidebar-minimized"
      );
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ["class"]
    });

    authenticationService.getUserMenues().subscribe(
      data => {
        let tmpNavItems = [];

        
        let haveAccesedMenues = data["data"];
        if (haveAccesedMenues.indexOf("dashboard") > -1)
          tmpNavItems.push({
            name: "داشبورد",
            url: "/admin/dashboard",
            icon: "icon-speedometer"
          });

        if (haveAccesedMenues.indexOf("setting") > -1)
          tmpNavItems.push({
            name: "تنظیمات اولیه سیستم",
            url: "/admin/settings",
            icon: "icon-settings"
          });

        if (haveAccesedMenues.indexOf("reports") > -1) {
          let reportsMeunuChildrens = [
            {
              name: "عملکرد",

              icon: "icon-pie-chart",

              children: [
                {
                  name: "عملکرد کلی سیستم",
                  url: "/admin/reports/all",
                  icon: "icon-graph"
                },
                {
                  name: "عملکرد داخلی ها",
                  url: "/admin/reports/lines",
                  icon: "icon-call-end fa-rotate-180"
                },
                {
                  name: "عملکرد گروه ها",
                  url: "/admin/reports/groups",
                  icon: "icon-people"
                }
              ]
            },
            {
              name: "قبوض",

              icon: "icon-layers",
              children: [
                {
                  name: "قبوض داخلی ها",
                  url: "/admin/reports/lines-bills",
                  icon: "icon-call-end fa-rotate-180"
                },
                {
                  name: "قبوض گروه ها",
                  url: "/admin/reports/groups-bills",
                  icon: "icon-people"
                }
              ]
            },

            {
              name: "ریز مکالمات سیستم",
              url: "/admin/reports/calls-details",
              icon: "icon-magnifier-add"
            }
          ];

          if (haveAccesedMenues.indexOf("operators")) {
            reportsMeunuChildrens.push({
              name: "اپراتور ها",
              url: "/admin/reports/operator",
              icon: "icon-people"
            });
          }

          if (haveAccesedMenues.indexOf("bills") > -1) {
            reportsMeunuChildrens.push({
              name: "قبوض",
              url: "/admin/reports/bills",
              icon: "icon-options"
            });
          }

          if (haveAccesedMenues.indexOf("queues") > -1) {
            reportsMeunuChildrens.push({
              name: "صف ها",
              url: "/admin/reports/queues",
              icon: "icon-list"
            });
          }

          tmpNavItems.push({
            name: "گزارشات",

            icon: "icon-chart",
            children: reportsMeunuChildrens
          });
        }

        let userMnggmntChildren = [
          {
            name: "ثبت کاربر جدید",
            url: "/admin/users-management/new-user",
            icon: "icon-user-following"
          },
          {
            name: "نمایش همه کاربران",
            url: "/admin/users-management/users",
            icon: "icon-people"
          }
        ];

        if (haveAccesedMenues.indexOf("userRols") > -1)
          userMnggmntChildren.push({
            name: "مقام ها",
            url: "/admin/users-management/roles",
            icon: "icon-badge"
          });

        if (haveAccesedMenues.indexOf("users") > -1)
          tmpNavItems.push({
            name: "مدیریت کاربران",

            icon: "icon-pie-chart",
            children: userMnggmntChildren
          });

        if (haveAccesedMenues.indexOf("groupExtensions") > -1)
          tmpNavItems.push({
            name: "مدیریت گروه بندی ها",
            url: "/admin/groups",
            icon: "icon-user"
          });

        this.navItems = tmpNavItems;
      },
      error => {
        console.log("error", error);
        authenticationService.handdleAuthErrors(error);
      }
    );
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }
  logout() {
    this.authenticationService.logout().subscribe(
      data => {
        this.toaster.success("با موفقیت از سیستم خارح شدید.", "خروج موفق!");
        this.router.navigate(["/login"]);
      },
      error => {
        this.toaster.error(
          "مشکلی در روند خروج. به صفحه ورود هدایت می شوید.",
          "خروج نا موفق!"
        );
        //this.router.navigate(['/login']);
      }
    );
  }
}
