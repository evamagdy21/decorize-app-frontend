
import { MenuSubItem } from "./menu-sub-item-model";

export interface Menu
{
    ID:number ,
    Name:string,
    Icon:string,
    SubItems:MenuSubItem[],
    IsSelected:boolean
}