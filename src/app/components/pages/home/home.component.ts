import { Component, OnInit } from '@angular/core';

import { MomentService } from 'src/app/services/moment.service';

import { Moment } from 'src/app/Moment';

import { environment } from 'src/environments/environment';

import { faSearch } from '@fortawesome/free-solid-svg-icons'; //button search

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allMoments: Moment[] = []
  moments: Moment[] = [] //Filtro
  baseApiUrl = environment.baseApiUrl

  faSearch = faSearch
  searcherTerm: string = ''

  constructor(private momentService: MomentService) { }

  ngOnInit(): void {
    this.momentService.getMoments().subscribe((items) => {
      const data = items.data

      data.map((item) => {
        item.created_at = new Date(item.created_at!).toLocaleDateString('pt-br')
      })

      this.allMoments = data
      this.moments = data
    })
  }

  search(e: Event): void {
    const target = e.target as HTMLInputElement
    const value = target.value /* pegando oque o user digitou */

    this.moments = this.allMoments.filter(moments => {
      return moments.title.toLowerCase().includes(value)
    })
  }

}
