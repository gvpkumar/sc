import { Injectable } from '@angular/core';
import { SidenavItem } from './sidenav-item/sidenav-item.model';
import { BehaviorSubject, Observable } from 'rxjs';
import * as _ from 'lodash';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';

@Injectable()
export class SidenavService {

  private _itemsSubject: BehaviorSubject<SidenavItem[]> = new BehaviorSubject<SidenavItem[]>([]);
  private _items: SidenavItem[] = [ ];
  items$: Observable<SidenavItem[]> = this._itemsSubject.asObservable();

  private _currentlyOpenSubject: BehaviorSubject<SidenavItem[]> = new BehaviorSubject<SidenavItem[]>([]);
  private _currentlyOpen: SidenavItem[] = [ ];
  currentlyOpen$: Observable<SidenavItem[]> = this._currentlyOpenSubject.asObservable();

  isIconSidenav: boolean;

  constructor(
    snackbar: MatSnackBar
  ) {
    const menu = this;

    // let dashboard = menu.addItem('Dashboard', 'dashboard', '/', 1);

    const trucks =  menu.addItem('Trucks', 'local_shipping', null, 1);
    menu.addSubItem(trucks, 'View Trucks', '/trucks', 1);
    menu.addSubItem(trucks, 'Horses', '/horses', 2);
    menu.addSubItem(trucks, 'Trailers', '/trailers', 3);

    const Drivers =  menu.addItem('Drivers', 'account_box', null, 2);
    menu.addSubItem(Drivers, 'Add', '/add-driver', 1);
    menu.addSubItem(Drivers, 'View All', '/drivers', 2);

    const Customers =  menu.addItem('Customers', 'account_circle', null, 3);
    menu.addSubItem(Customers, 'Add', '/add-customer', 1);
    menu.addSubItem(Customers, 'View All', '/customers', 2);

    const Coupons =  menu.addItem('Coupons', 'credit_card', null, 4);
    menu.addSubItem(Coupons, 'Add', '/add-coupon', 1);
    menu.addSubItem(Coupons, 'View All', '/coupons', 2);

    const Dispatch =  menu.addItem('Dispatch', 'layers', null, 5);
    menu.addSubItem(Dispatch, 'Add', '/add-dispatch', 1);
    menu.addSubItem(Dispatch, 'View All', '/dispatch', 2);

    const Orders =  menu.addItem('Orders', 'layers', null, 6);
    menu.addSubItem(Orders, 'Add', '/add-order', 1);
    menu.addSubItem(Orders, 'View All', '/orders', 2);

    const ServiceInformation =  menu.addItem('Services', 'layers', null, 7);
    menu.addSubItem(ServiceInformation, 'Horse Service', '/horse-services', 1);
    menu.addSubItem(ServiceInformation, 'Trailer Service', '/trailer-services', 2);

    const JobCard  = menu.addItem('Job Card', 'layers', null, 8);
    menu.addSubItem(JobCard, 'JobCard', '/add-jobcard', 1);
    menu.addSubItem(JobCard, 'View JobCards', '/view-jobcards', 2);

    const dynamicMenuFunctionDemo = () => {
      const dynamicFunction = () => {
        const snackbarRef = snackbar.open('This menu item got added dynamically!', 'Remove item', <MatSnackBarConfig>{
          duration: 5000
        });

        snackbarRef.onAction().subscribe(() => {
          menu.removeItem(dynamicMenu);
        });
      };

      const dynamicMenu = menu.addItem('Dynamic Menu Item', 'extension', dynamicFunction, 12);
    };

   // let addMenu = menu.addItem('Add Menu Item', 'add', dynamicMenuFunctionDemo, 99, null, null, 'add-dynamic-menu');
  }

  addItem(name: string, icon: string, route: any, position: number, badge?: string, badgeColor?: string, customClass?: string) {
    const item = new SidenavItem({
      name: name,
      icon: icon,
      route: route,
      subItems: [ ],
      position: position || 99,
      badge: badge || null,
      badgeColor: badgeColor || null,
      customClass: customClass || null
    });

    this._items.push(item);
    this._itemsSubject.next(this._items);

    return item;
  }

  addSubItem(parent: SidenavItem, name: string, route: any, position: number) {
    const item = new SidenavItem({
      name: name,
      route: route,
      parent: parent,
      subItems: [ ],
      position: position || 99
    });

    parent.subItems.push(item);
    this._itemsSubject.next(this._items);

    return item;
  }

  removeItem(item: SidenavItem) {
    const index = this._items.indexOf(item);
    if (index > -1) {
      this._items.splice(index, 1);
    }

    this._itemsSubject.next(this._items);
  }

  isOpen(item: SidenavItem) {
    return (this._currentlyOpen.indexOf(item) !== -1);
  }

  toggleCurrentlyOpen(item: SidenavItem) {
    let currentlyOpen = this._currentlyOpen;

    if (this.isOpen(item)) {
      if (currentlyOpen.length > 1) {
        currentlyOpen.length = this._currentlyOpen.indexOf(item);
      } else {
        currentlyOpen = [ ];
      }
    } else {
      currentlyOpen = this.getAllParents(item);
    }

    this._currentlyOpen = currentlyOpen;
    this._currentlyOpenSubject.next(currentlyOpen);
  }

  getAllParents(item: SidenavItem, currentlyOpen: SidenavItem[] = [ ]) {
    currentlyOpen.unshift( item );

    if (item.hasParent()) {
      return this.getAllParents(item.parent, currentlyOpen);
    } else {
      return currentlyOpen;
    }
  }

  nextCurrentlyOpen(currentlyOpen: SidenavItem[]) {
    this._currentlyOpen = currentlyOpen;
    this._currentlyOpenSubject.next(currentlyOpen);
  }

  nextCurrentlyOpenByRoute(route: string) {
    let currentlyOpen = [ ];

    const item = this.findByRouteRecursive(route, this._items);

    if (item && item.hasParent()) {
      currentlyOpen = this.getAllParents(item);
    } else if (item) {
      currentlyOpen = [item];
    }

    this.nextCurrentlyOpen(currentlyOpen);
  }

  findByRouteRecursive(route: string, collection: SidenavItem[]) {
    let result = _.find(collection, { 'route': route });

    if (!result) {
      _.each(collection, (item) => {
        if (item.hasSubItems()) {
          const found = this.findByRouteRecursive(route, item.subItems);

          if (found) {
            result = found;
            return false;
          }
        }
      });
    }

    return result;
  }

  get currentlyOpen() {
    return this._currentlyOpen;
  }

  getSidenavItemByRoute(route) {
    return this.findByRouteRecursive(route, this._items);
  }
}
