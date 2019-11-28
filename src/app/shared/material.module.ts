import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule } from "@angular/material/card";

@NgModule({
  imports: [MatButtonModule, MatTabsModule, MatToolbarModule, MatCardModule],
  exports: [MatButtonModule, MatTabsModule, MatToolbarModule, MatCardModule]
})

export class MaterialModule {}
