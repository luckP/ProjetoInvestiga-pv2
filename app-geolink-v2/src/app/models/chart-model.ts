import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';

export class ChartModel{
    id: number;
    title:string;
    subtitle:string;
    chartSize:string;
    lock: boolean;

    datasets: ChartDataSets[];
    labels: Label[];
    options: (ChartOptions & { annotation: any });
    colors:Color[];
    show_legends:boolean;

    chartType:string;
    chartTypes:any[];


}