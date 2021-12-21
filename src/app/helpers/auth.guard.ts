import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthenticationService } from "../services/authentication.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        const user = this.authenticationService.userValue;
        if (user) {
            if (user.message !== null){
                return false;
            }
            return true;
        }
        this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}