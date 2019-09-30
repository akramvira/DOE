import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarChartComponent } from '../bar-chart/bar-chart.component';
import { LineChartComponent } from '../line-chart/line-chart.component';
import { DoughnutChartComponent } from '../doughnut-chart/doughnut-chart.component';
import { ChartsModule } from 'ng2-charts';
import { PieChartComponent } from '../pie-chart/pie-chart.component';

@NgModule({
  declarations: [
    DoughnutChartComponent,
    LineChartComponent,
    BarChartComponent,
    PieChartComponent
  ],
  imports: [
    CommonModule,
    ChartsModule
  ],
  exports:[
    DoughnutChartComponent,
    LineChartComponent,
    BarChartComponent,
    PieChartComponent
  ]
})
export class ComponentsModule { }
