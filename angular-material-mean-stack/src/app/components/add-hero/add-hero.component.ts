/* import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-hero',
  templateUrl: './add-hero.component.html',
  styleUrls: ['./add-hero.component.css']
})
export class AddHeroComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

} */

import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface HeroRomanticInterest {
  name: string;
}
@Component({
  selector: 'app-add-hero',
  templateUrl: './add-hero.component.html',
  styleUrls: ['./add-hero.component.css'],
})
export class AddHeroComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList') chipList;
  @ViewChild('resetHeroForm') myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  heroForm: FormGroup;
  heroRomanticInterestArray: HeroRomanticInterest[] = [];
  SectioinArray: any = ['Avengers', 'Fantastic Four', 'Justice League', 'Titans', 'X-Men'];
  ngOnInit() {
    this.submitInfoForm();
  }
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private heroApi: ApiService
  ) {}
  /* Reactive info form */
  submitInfoForm() {
    /* student_name: ['', [Validators.required]],
      student_email: ['', [Validators.required]],
      section: ['', [Validators.required]],
      subjects: [this.subjectArray],
      dob: ['', [Validators.required]],
      gender: ['Male'], */

    this.heroForm = this.fb.group({
      hero_name: ['', [Validators.required]],
      hero_alias: ['', [Validators.required]],
      hero_group: ['', [Validators.required]],
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
  /* Submit info */
  submitHeroForm() {
    if (this.heroForm.valid) {
      this.heroApi.AddHero(this.heroForm.value).subscribe((res) => {
        this.ngZone.run(() => this.router.navigateByUrl('/heroes-list'));
      });
    }
  }
}