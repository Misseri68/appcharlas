
  import { bootstrapApplication } from '@angular/platform-browser';
  import { AppComponent } from './app/app.component';
  import { provideRouter } from '@angular/router';
import { routes } from './app/app-routing.module';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

  bootstrapApplication(AppComponent, {
    providers: [
      provideRouter(routes),
      provideAnimations(),
      importProvidersFrom(HttpClientModule)
    ],
  }).catch(err => console.error(err));
