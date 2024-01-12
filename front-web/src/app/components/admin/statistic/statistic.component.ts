import { StatisticService } from './../../../services/statistic.service';
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { Statistic } from 'src/app/models/statisticResponse';


@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {


  statisticArray: Statistic[]=[];
  barChartData: ChartDataSets[] = [];
  isFoo : boolean = true;


  constructor(private StatisticService: StatisticService) { }

  ngOnInit(): void {

    this.subscribeToStatistic();

  }



  //sbscribe statistic
  subscribeToStatistic() {

    this.StatisticService.getStatistic().subscribe((res) => {
      this.statisticArray = res.data;

      this.barChartData = [
        { data: this.statisticArray.map(res => res.total), label: 'totalité' },
        { data: this.statisticArray.map(res => res.used), label: 'utiliser' },
        { data: this.statisticArray.map(res => res.served), label: 'server' }
      ];
    })

  }


//chart
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] =
    ['Une entrée ou un dessert au choix',
      'Un burger au choix',
      'Un menu du jour',
      'Un menu au choix',
      '70% de réduction'];
  public barChartBar  : ChartType = 'bar'
  public barChartHorizontal : ChartType = 'horizontalBar';
  public barChartLegend = true;
  public barChartPlugins = [];

  
  
 
  

  displayedColumns: string[] = ['gain', 'used', 'served','total'];
 


  getTotal() {
    return this.statisticArray.map(t => t.total).reduce((acc, value) => acc + value, 0);
  }
  getUsed() {
    return this.statisticArray.map(t => t.used).reduce((acc, value) => acc + value, 0);
  }
  getServed() {
    return this.statisticArray.map(t => t.served).reduce((acc, value) => acc + value, 0);
  }

//texte button 
getBtnText(){
  if(this.isFoo){
    return 'diagramme à bandes horizontales'
  }else
    return 'diagramme à bandes verticales'
}

}





