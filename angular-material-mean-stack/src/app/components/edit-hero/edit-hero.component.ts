/* import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-hero',
  templateUrl: './edit-hero.component.html',
  styleUrls: ['./edit-hero.component.css']
})
export class EditHeroComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
 */

import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface HeroRomanticInterest {
  name: string;
}
@Component({
  selector: 'app-edit-hero',
  templateUrl: './edit-hero.component.html',
  styleUrls: ['./edit-hero.component.css'],
})
export class EditHeroComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList') chipList;
  @ViewChild('resetHeroForm') myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  heroForm: FormGroup;
  heroRomanticInterestArray: HeroRomanticInterest[] = [];
  SectioinArray: any = ['A', 'B', 'C', 'D', 'E'];
  ngOnInit() {
    this.updateInfoForm();
  }
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private heroApi: ApiService
  ) {
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.heroApi.GetHero(id).subscribe((data) => {
      console.log(data.hero_romantic_interest);
      this.heroRomanticInterestArray = data.hero_romantic_interest;
      this.heroForm = this.fb.group({
        hero_name: [data.hero_name, [Validators.required]],
        hero_alias: [data.hero_alias, [Validators.required]],
        hero_enemy: [data.hero_enemy, [Validators.required]],
        hero_romantic_interest: [data.hero_romantic_interest],
        gender: [data.gender],
        creation_date: [data.creation_date, [Validators.required]],
      });
    });
  }
  /* Reactive book form */
  updateInfoForm() {
    this.heroForm = this.fb.group({
      hero_name: ['', [Validators.required]],
      hero_alias: ['', [Validators.required]],
      hero_enemy: ['', [Validators.required]],
      hero_romantic_interest: [this.heroRomanticInterestArray],
      gender: ['Male'],
      creation_date: ['', [Validators.required]],
    });
  }
  /* Add dynamic languages */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add language
    if ((value || '').trim() && this.heroRomanticInterestArray.length < 5) {
      this.heroRomanticInterestArray.push({ name: value.trim() });
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  /* Remove dynamic languages */
  remove(romantic_interest: HeroRomanticInterest): void {
    const index = this.heroRomanticInterestArray.indexOf(romantic_interest);
    if (index >= 0) {
      this.heroRomanticInterestArray.splice(index, 1);
    }
  }
  /* Date */
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.heroForm.get('creation_date').setValue(convertDate, {
      onlyself: true,
    });
  }
  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.heroForm.controls[controlName].hasError(errorName);
  };
  /* Update book */
  updateHeroForm() {
    console.log(this.heroForm.value);
    var id = this.actRoute.snapshot.paramMap.get('id');
    if (window.confirm('Are you sure you want to update?')) {
      this.heroApi
        .UpdateHero(id, this.heroForm.value)
        .subscribe((res) => {
          this.ngZone.run(() => this.router.navigateByUrl('/heroes-list'));
        });
    }
  }
}