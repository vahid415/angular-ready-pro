import { NgModule } from '@angular/core';
import { AuthenticationProvider } from '../../types';
import { FakeAuthenticationProviderService } from './fake-authentication-provider.service';

@NgModule({
  providers: [
    { provide: AuthenticationProvider, useClass: FakeAuthenticationProviderService, multi: false }
  ],
})
export class FakeAuthenticationProviderModule {
}
