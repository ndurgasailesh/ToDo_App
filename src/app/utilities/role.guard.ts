import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthenticationService } from "../services/authentication.service";
import { Injectable } from "@angular/core";
import { AlertService } from "ngx-alerts";

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService) {
    }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.userValue;
        const expectedRole = route.data['role'];
        if (currentUser?.userRoles[0] === expectedRole[0]) {
            return true;
        }
        this.router.navigate(['/unauthorised']);
        return false;
    }
}