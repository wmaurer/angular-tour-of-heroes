import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
    selector: 'app-hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.scss'],
})
export class HeroDetailComponent implements OnInit {
    hero: Hero | undefined;

    constructor(private route: ActivatedRoute, private heroService: HeroService, private location: Location) {}

    ngOnInit(): void {
        this.getHero();
    }

    getHero(): void {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
        this.heroService.getHero(id).subscribe(hero => (this.hero = hero));
    }

    goBack(): void {
        this.location.back();
    }

    save(): void {
        if (this.hero) {
            this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
        }
    }
}
