import { Component } from '@angular/core';
import { EMPTY, interval, map, Observable, startWith, take, takeUntil } from 'rxjs';
import { LifecycleHooks, LifecycleHooksDirective } from './lifecycle-hooks';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    hostDirectives: [LifecycleHooksDirective],
})
export class AppComponent {
    title = 'Tour of Heroes';

    public fromExternal$: Observable<string> = EMPTY;

    constructor(lc: LifecycleHooks) {
        interval(5000)
            .pipe(
                map((_, i) => i + 1),
                startWith(0),
                takeUntil(lc.onDestroy$),
            )
            .subscribe(i => {
                this.fromExternal$ = interval(500).pipe(
                    take(8),
                    map((_, j) => `${i} fromExternal: ${j}`),
                    takeUntil(lc.onDestroy$),
                );
            });
    }
}
