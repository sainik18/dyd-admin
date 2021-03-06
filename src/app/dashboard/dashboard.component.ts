import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from "ng-chartist";
import { userService } from 'app/user.service';

declare var require: any;
const data: any = require('../shared/data/chartist.json');

export interface Chart {
    type: ChartType;
    data: Chartist.IChartistData;
    options?: any;
    responsiveOptions?: any;
    events?: ChartEvent;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    
  todayDevotion: any;
  selectedLang = localStorage.getItem('lang');
  devData = [];
  pastDevotions = [];

  constructor(private userservice: userService) { }

  ngOnInit() {
    let nowDate = new Date(); 
    //let date = '2019-01-01';
    let date = nowDate.getFullYear()+'-'+(nowDate.getMonth()+1)+'-'+nowDate.getDate();

      let params = {
        quote_date: date,
        lang: localStorage.getItem('lang')
      }
      this.userservice.getDevotionByDate(params).subscribe( (data: any) => {
          if(data.status){
              this.todayDevotion = data.data[0];
          }
      });

      this.getDevotions();
  }

  getDevotions(){
    let weeks = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    let nowDate = new Date(); 
    let today = nowDate.getFullYear()+'-'+(nowDate.getMonth()+1)+'-'+nowDate.getDate();
    let yesterday = nowDate.getFullYear()+'-'+(nowDate.getMonth()+1)+'-'+nowDate.getDate();
    let showDate = nowDate.getDate()+' '+weeks[nowDate.getMonth()+1];
    let params = {
        lang: localStorage.getItem('lang')
      }
  
      this.userservice.getdevotions(params).subscribe( (data) => {
        if(data.status){
          this.devData = data.data;

          for(let i = 0; i < this.devData.length; i++){
              let tempDate = '';
              if(today == this.devData[i].quote_date){
                  tempDate = 'Today';
              }else if (yesterday == this.devData[i].quote_date){
                tempDate = 'Yesterday';
              }else {
                  tempDate = showDate;
              }
              this.pastDevotions.push({date: tempDate, title: this.devData[i].topic, _id: this.devData[i]._id });

              if(i == 3){
                  break;
              }
          }
        }
        
      })
  }

  viewDevotion(_id){
    let todayDevotion = this.devData.filter( ddata => ddata._id == _id);
    this.todayDevotion = todayDevotion[0];
  }

  // Widget Area chart 1 configuration Starts
  WidgetAreaChart1: Chart = {
    type: 'Line', data: data['WidgetAreaChart'],

    options: {
        axisX: {
            showGrid: false,
            showLabel: false,
            offset: 0,
        },
        axisY: {
            showGrid: false,
            low: 0,
            showLabel: false,
            offset: 0,
            scaleMinSpace: 10,
        },

        lineSmooth: Chartist.Interpolation.simple({
            divisor: 2
        }),
        fullWidth: true,
        showArea: true,
        onlyInteger: true,
        targetLine: {
            value: 30,
            class: 'ct-target-line'
        }
    },
    events: {
        created(data: any): void {
            var defs = data.svg.elem('defs');
            defs.elem('linearGradient', {
                id: 'wGradient1',
                x1: 0,
                y1: 1,
                x2: 0,
                y2: 0
            }).elem('stop', {
                offset: 0,
                'stop-color': 'rgba(130,73,232, 1)'
            }).parent().elem('stop', {
                offset: 1,
                'stop-color': 'rgba(41,123,249, 1)'
            });

            const targetLineX = data.chartRect.x1 + (data.chartRect.width() - (data.chartRect.width() / data.bounds.step))

            data.svg.elem('line', {
                x1: targetLineX,
                x2: targetLineX,
                y1: data.chartRect.y1,
                y2: data.chartRect.y2
            }, data.options.targetLine.class);
           
        },
        draw(data: any): void {
            var circleRadius = 10;
            if (data.type === 'point') {
                var circle = new Chartist.Svg('circle', {
                    cx: data.x,
                    cy: data.y,
                    r: circleRadius,
                    class: data.value.y === 30 ? 'ct-point-circle' : 'ct-point-circle-transperent'
                });
                data.element.replace(circle);
            }
        }

    },



};
// Widget Area chart 1 configuration Ends

// Widget Area chart 2 configuration Starts
WidgetAreaChart2: Chart = {
    type: 'Line', data: data['WidgetAreaChart'],

    options: {
        axisX: {
            showGrid: false,
            showLabel: false,
            offset: 0,
        },
        axisY: {
            showGrid: false,
            low: 0,
            showLabel: false,
            offset: 0,
            scaleMinSpace: 10,
        },

        lineSmooth: Chartist.Interpolation.simple({
            divisor: 2
        }),
        fullWidth: true,
        showArea: true,
        onlyInteger: true,
        targetLine: {
            value: 30,
            class: 'ct-target-line'
        }
    },
    events: {
        created(data: any): void {
            var defs = data.svg.elem('defs');
            defs.elem('linearGradient', {
                id: 'wGradient2',
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
            }).elem('stop', {
                offset: 0,
                'stop-color': 'rgba(252,157,48, 1)'
            }).parent().elem('stop', {
                offset: 1,
                'stop-color': 'rgba(250,91,76, 1)'
            });

            const targetLineX = data.chartRect.x1 + (data.chartRect.width() - (data.chartRect.width() / data.bounds.step))

            data.svg.elem('line', {
                x1: targetLineX,
                x2: targetLineX,
                y1: data.chartRect.y1,
                y2: data.chartRect.y2
            }, data.options.targetLine.class);
            
        },
        draw(data: any): void {
            var circleRadius = 10;
            if (data.type === 'point') {
                var circle = new Chartist.Svg('circle', {
                    cx: data.x,
                    cy: data.y,
                    r: circleRadius,
                    class: data.value.y === 30 ? 'ct-point-circle' : 'ct-point-circle-transperent'
                });
                data.element.replace(circle);
            }
        }

    },



};
// Widget Area chart 2 configuration Ends

// Widget Area chart 3 configuration Starts
WidgetAreaChart3: Chart = {
    type: 'Line', data: data['WidgetAreaChart'],

    options: {
        axisX: {
            showGrid: false,
            showLabel: false,
            offset: 0,
        },
        axisY: {
            showGrid: false,
            low: 0,
            showLabel: false,
            offset: 0,
            scaleMinSpace: 10,
        },

        lineSmooth: Chartist.Interpolation.simple({
            divisor: 2
        }),
        fullWidth: true,
        showArea: true,
        onlyInteger: true,
        targetLine: {
            value: 30,
            class: 'ct-target-line'
        }
    },
    events: {
        created(data: any): void {
            var defs = data.svg.elem('defs');
            defs.elem('linearGradient', {
                id: 'wGradient3',
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
            }).elem('stop', {
                offset: 0,
                'stop-color': 'rgba(120, 204, 55, 1)'
            }).parent().elem('stop', {
                offset: 1,
                'stop-color': 'rgba(0, 75, 145, 1)'
            });

            const targetLineX = data.chartRect.x1 + (data.chartRect.width() - (data.chartRect.width() / data.bounds.step))

            data.svg.elem('line', {
                x1: targetLineX,
                x2: targetLineX,
                y1: data.chartRect.y1,
                y2: data.chartRect.y2
            }, data.options.targetLine.class);
           
        },
        draw(data: any): void {
            var circleRadius = 10;
            if (data.type === 'point') {
                var circle = new Chartist.Svg('circle', {
                    cx: data.x,
                    cy: data.y,
                    r: circleRadius,
                    class: data.value.y === 30 ? 'ct-point-circle' : 'ct-point-circle-transperent'
                });
                data.element.replace(circle);
            }
        }

    },



};
// Widget Area chart 3 configuration Ends
}
