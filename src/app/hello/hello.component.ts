import { Component, Input } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { Observable } from 'rxjs';

interface State {
    fromExternal: string;
}

@Component({
    selector: 'app-hello',
    templateUrl: './hello.component.html',
    styleUrls: ['./hello.component.scss'],
    providers: [RxState],
})
export class HelloComponent {
    @Input() set fromExternal(value: Observable<string>) {
        this.state.connect('fromExternal', value);
    }
    public fromExternal$ = this.state.select('fromExternal');

    constructor(private state: RxState<State>) {}
}
