import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SidenavItemComponent } from './sidenav/sidenav-item/sidenav-item.component';
import { IconSidenavDirective } from './sidenav/icon-sidenav.directive';
import { SearchComponent } from './toolbar/search/search.component';
import { BreadcrumbsComponent } from './breadcrumb/breadcrumb.component';
import { AdminComponent } from './admin/admin.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ToolbarUserButtonComponent } from './toolbar/toolbar-user-button/toolbar-user-button.component';
import { SearchBarComponent } from './toolbar/search-bar/search-bar.component';
import { ToolbarNotificationsComponent } from './toolbar/toolbar-notifications/toolbar-notifications.component';
import { SidenavService } from './sidenav/sidenav.service';
import { MediaReplayService } from './sidenav/mediareplay/media-replay.service';
import { BreadcrumbService } from './breadcrumb/breadcrumb.service';
import { MaterialUiModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { QuickpanelComponent } from './quickpanel/quickpanel.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialUiModule,
    FlexLayoutModule,
    FormsModule,
   
  ],
  declarations: [
    SidenavComponent,
    SidenavItemComponent,
    IconSidenavDirective,
    SearchComponent,
    BreadcrumbsComponent,
    AdminComponent,
    ToolbarComponent,
    ToolbarUserButtonComponent,
    SearchBarComponent,
    ToolbarNotificationsComponent,
    QuickpanelComponent
    
  ],
  providers: [
    SidenavService,
    MediaReplayService,
    BreadcrumbService
  ]
})
export class CoreModule { }
