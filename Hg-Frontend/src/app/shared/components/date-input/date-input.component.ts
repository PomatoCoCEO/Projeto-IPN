import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.css'],
})
export class DateInputComponent implements OnInit, OnChanges {
  constructor() {}

  @Input() hourIncluded: string = '';
  @Input() pastInvalid: boolean = true;
  @Input() date: Date | undefined = undefined;
  @Output() dateEmitter = new EventEmitter<Date>();
  public dateAid: DateStruct =
    this.date == undefined
      ? {
          hours: 0,
          minutes: 0,
          seconds: 0,
          day: 0,
          month: 0,
          year: 0,
        }
      : {
          hours: this.date.getHours(),
          minutes: this.date.getMinutes(),
          seconds: this.date.getSeconds(),
          day: this.date.getDay(),
          month: this.date.getMonth() + 1,
          year: this.date.getFullYear(),
        };

  public years = () => {
    return this.pastInvalid
      ? this.valArray(101, new Date().getFullYear())
      : [...Array(120).keys()].map((i) => new Date().getFullYear() - i);
  };

  onSubmit() {
    let d = this.dateAid;
    /*alert(
      `Emitting ${d.day}/${d.month}/${d.year} ${d.hours}:${d.minutes}:${d.seconds}`
    );*/
    this.dateEmitter.emit(
      new Date(d.year, d.month - 1, d.day, d.hours, d.minutes, d.seconds)
    );
  }

  valArray(limit: number, base: number) {
    return [...Array(limit).keys()].map((i) => i + base);
  }

  public hasPassed(d: DateStruct) {
    // console.log(typeof d); // STRING!!
    /*let di = '' + d;
    let r = Date.parse(di);
    return r - new Date().getTime() < 0;*/
    let dt = new Date(d.year, d.month - 1, d.day, d.hours, d.minutes, d.seconds);
    return dt < new Date();
  }

  public isDateValid(day: number, month: number, year: number): boolean {
    if (day < 0 || day > 31 || month < 0 || month > 13) return false;
    let daysMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let isLeap = year % 4 == 0 && (year % 400 == 0 || year % 100 != 0);
    if (isLeap && month == 2 && day == 29) return true;
    return day <= daysMonths[month - 1];
  }

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    this.dateAid =
      this.date == undefined
        ? {
            hours: 0,
            minutes: 0,
            seconds: 0,
            day: 0,
            month: 0,
            year: 0,
          }
        : {
            hours: this.date.getHours(),
            minutes: this.date.getMinutes(),
            seconds: this.date.getSeconds(),
            day: this.date.getDay(),
            month: this.date.getMonth() + 1,
            year: this.date.getFullYear(),
          };
  }
}

class DateStruct {
  public hours = 0;
  public minutes = 0;
  public seconds = 0;
  public day = 0;
  public month = 0;
  public year = 0;
  constructor() {}
}
