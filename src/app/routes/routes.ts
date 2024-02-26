import { Routes } from "@angular/router";
import { AuthPageComponent } from "../components/pages/auth-page/auth-page.component";
import { NotFoundPageComponent } from "../components/pages/not-found-page/not-found-page.component";

export const APP_ROUTES: Routes = [
    {
        path: '',
        title: 'Auth',
        component: AuthPageComponent
    },
    {
        path: '**',
        component: NotFoundPageComponent
    }
];