import { OnInit, Component } from "@angular/core";

@Component({
    moduleId: module.id,
    selector: 'app-group-headers',
    template: `
    <div class="groupHeader">
        <app-header></app-header>
        <app-top-navbar></app-top-navbar>
        <app-menu ></app-menu>
    </div>
    `,
    // styleUrls: ['header.component.css']
})
export class GroupHeadersComponent implements OnInit {
    constructor() {
    }


    ngOnInit() {
    }
}
