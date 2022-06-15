/* import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.css']
})
export class HeroesListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
 */

import { Hero } from './../../shared/hero';
import { ApiService } from './../../shared/api.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.css'],
})
export class HeroesListComponent implements OnInit {
  HeroData: any = [];
  dataSource: MatTableDataSource<Hero>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = [
    '_id',
    'hero_name',
    'hero_alias',
    'hero_enemy',
    'action',
  ];
  constructor(private heroApi: ApiService) {
    this.heroApi.GetHeroes().subscribe((data) => {
      this.HeroData = data;
      this.dataSource = new MatTableDataSource<Hero>(this.HeroData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    });
  }
  ngOnInit() {}
  deleteHero(index: number, e) {
    if (window.confirm('Are you sure?')) {
      const data = this.dataSource.data;
      data.splice(
        this.paginator.pageIndex * this.paginator.pageSize + index,
        1
      );
      this.dataSource.data = data;
      this.heroApi.DeleteHero(e._id).subscribe();
    }
  }
}