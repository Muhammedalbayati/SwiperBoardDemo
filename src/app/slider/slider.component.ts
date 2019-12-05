import { Component, OnInit, Output, Input,EventEmitter } from '@angular/core';
import { Options, ChangeContext, PointerType } from 'ng5-slider';
// import { EventEmitter } from 'events';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

@Output() sliderChangeValue=new EventEmitter();

  constructor() { }

  ngOnInit() {
    console.log(this.value)
  }


  value: number = 1;
  options: Options = {
    floor: 1,
    ceil: 10,
    step: 1,
    showTicks: true,
    showTicksValues: true
    
  };


  logText: string = '';
  
  onChangeContext(changeContext: ChangeContext):void
  {
    //console.log(changeContext.value)
    this.sliderChangeValue.emit(changeContext.value.toString())
   // return `value: ${changeContext.value}, `
           
  }

}
