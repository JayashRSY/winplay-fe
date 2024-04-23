import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DesignsComponent } from "./designs.component";
import { CreateComponent } from "./create/create.component";
import { ArtistGuard } from "src/app/guards/artist.guard";

const routes: Routes = [
    {
        path: "",
        component: DesignsComponent
    },
    {
        path: 'create',
        component: CreateComponent,
        canActivate: [ArtistGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DesignsRoutingModule { }  