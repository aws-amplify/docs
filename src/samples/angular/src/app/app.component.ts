import { Component, OnDestroy } from '@angular/core';
import { ZenObservable } from 'zen-observable-ts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {
  private subscription: ZenObservable.Subscription | null = null;

  title = 'amplify-app';

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = null;
  }
}
