import { Component, OnInit } from '@angular/core';
import { departmentCategoriesViewModel } from '../../../shared/view-models/department-categories-view-model';
import { MenuService } from './menu.service';
import { Menu } from './menu-model';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  Menu: departmentCategoriesViewModel[] = [];
  constructor(private menuService: MenuService) {
    this.fillmenu();
  }
  changeSelecteion(item: Menu) {
    item.IsSelected = !item.IsSelected
  }
  ngOnInit() {
    // this.fillmenu();
  }
  fillmenu() {
    this.menuService.get().subscribe((response) => {
      this.Menu = response.Data;
      this.Menu.forEach(x => x.IsSelected = false);
      // //console.log("this.Menu : " + JSON.stringify(this.Menu));
    });
  }
}
