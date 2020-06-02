import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { APP_MODULE_DECLARATIONS, APP_MODULE_IMPORTS } from './app.module.dependencies';
import { PizzaService } from './containers/pizza-form-container/services/pizza.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [...APP_MODULE_DECLARATIONS],
  imports: [...APP_MODULE_IMPORTS, HttpClientModule],
  providers: [PizzaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
