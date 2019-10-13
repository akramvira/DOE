import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarChartComponent } from '../bar-chart/bar-chart.component';
import { LineChartComponent } from '../line-chart/line-chart.component';
import { DoughnutChartComponent } from '../doughnut-chart/doughnut-chart.component';
import { ChartsModule } from 'ng2-charts';
import { PieChartComponent } from '../pie-chart/pie-chart.component';
import { SpintickComponent } from '../spintick/spintick.component';
import { LoadingComponent } from '../loading/loading.component';
import { ProgressbarComponent } from '../progressbar/progressbar.component';

@NgModule({
  declarations: [
    DoughnutChartComponent,
    LineChartComponent,
    BarChartComponent,
    PieChartComponent,
    SpintickComponent,
    LoadingComponent,
    ProgressbarComponent
  ],
  imports: [
    CommonModule,
    ChartsModule
  ],
  exports:[
    DoughnutChartComponent,
    LineChartComponent,
    BarChartComponent,
    PieChartComponent,
    SpintickComponent,
    LoadingComponent,
    ProgressbarComponent
  ]
})
export class ComponentsModule { }
