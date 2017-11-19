import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProduktyComponent } from './produkty/produkty.component';
import { WidokKoszykaComponent } from './widok-koszyka/widok-koszyka.component';
import { PodsumowanieComponent } from './podsumowanie/podsumowanie.component';

@NgModule({
    exports: [RouterModule],
    imports: [
        RouterModule.forRoot([
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
            }])
    ]
})
export class AppRoutingModule { }
