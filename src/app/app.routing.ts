import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProduktyComponent } from './produkty/produkty.component';
import { WidokKoszykaComponent } from './widok-koszyka/widok-koszyka.component';
import { PodsumowanieComponent } from './podsumowanie/podsumowanie.component';
import { AdminPanelComponentComponent } from './admin-panel-component/admin-panel-component.component';
import { AdminLoginComponentComponent } from './admin-login-component/admin-login-component.component';
import { RegisterComponentComponent } from './register-component/register-component.component';
import { AuthGuard } from './auth-guard';

const appRoutes = [
    {
        component: AdminLoginComponentComponent,
        path: 'login'
    },
    {
        component: RegisterComponentComponent,
        path: 'register'
    },
    {
        component: AdminPanelComponentComponent,
        canActivate: [AuthGuard],
        path: 'adminPanel'
    },
    {
        component: WidokKoszykaComponent,
        path: 'koszyk'
    },
    {
        component: PodsumowanieComponent,
        path: 'podsumowanie'
    },
    {
        component: ProduktyComponent,
        path: '**'
    }];

@NgModule({
    exports: [RouterModule],
    imports: [
        RouterModule.forRoot(appRoutes)
    ]
})
export class AppRoutingModule { }
