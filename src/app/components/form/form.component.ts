import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{

  @Input() event:any = {}
  @Output() public emitter = new EventEmitter();
  @Output() public emitterAnnulation = new EventEmitter();


  start:string | null ='';
  end:string | null='';
  type:string ='';
  motif:string ='';

  constructor(private _datePipe: DatePipe) {}

  ngOnInit(): void {
    this.start = this.transformDate(this.event.start);
    this.end = this.event.end ==null ? this.transformDate(this.event.start) : this.transformDate(this.event.end);
    this.type = this.getType();
    this.motif = this.getMotif();
  }

  transformDate(date:Date) {
    return this._datePipe.transform(date, 'yyyy-MM-dd');
  }

  getType() {
    return this.event.extendedProps?.type;
  }

  getMotif() {
    return this.event.extendedProps?.motif;
  }




}
