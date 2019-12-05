import { Component, OnInit, DoCheck } from '@angular/core';

import {
  SwiperConfigInterface
  //SwiperScrollbarInterface, SwiperPaginationInterface,SwiperComponent, SwiperDirective,
} from 'ngx-swiper-wrapper';

import { UsersService } from '../services';
import { User } from '../models/user';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  public users: object[] = [];
  errorMsg: string;
  public sliderValue: any;
  private _delay: number=1;

  get delay() {
    return this._delay;
  }

  set delay(val: number) {
    this._delay = val
    console.log('set ' + val)
  }


  constructor(
    private usersServices: UsersService
  ) { }

  ngOnInit() {
    this.getUsers();
    this.users.unshift({ "userName": "0", "phoneNumber": "0" });//For some reason the ngx-swiper-wrapper the AutoPlay will not work if I don't do this.

  }


  public config: SwiperConfigInterface = {
    direction: 'horizontal',
    //slidesPerView: "auto",
    slidesPerView: 1.16,
    spaceBetween: 4,
    centeredSlides: true,
    observer: true,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    loop: true,
    navigation: false,
    pagination: false,
    autoplay: {
      delay: this.delay*1000
    },
    speed: 1000,
    // watchOverflow: true,
    // watchSlidesProgress: true
  };

  getUsers() {
    //this.spinner.show()
    var _data: User[] = []
    this.usersServices.getUsers()
      .subscribe(data => {
        _data = data
        //this.spinner.hide() 
      },
        (err: any) => (this.errorMsg = err),
        () => {
          this.fillUsersArray(_data)
        }
      );
  }

  fillUsersArray(data) {
    data.forEach(user => {
      this.users.push(user)
    });
  }

  sliderChange(data: any) {
    console.log(data);
    //this.config:{delay :Number(data)}
    this.delay = Number(data);

    this.config= {
      direction: 'horizontal',
    //slidesPerView: "auto",
    slidesPerView: 1.16,
    spaceBetween: 4,
    centeredSlides: true,
    observer: true,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    loop: true,
    navigation: false,
    pagination: false,
    autoplay: {
      delay: this.delay*1000
    },
    speed: 1000,
    // watchOverflow: true,
    // watchSlidesProgress: true
    }

  }

}