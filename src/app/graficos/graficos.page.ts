import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { ImagenfsService } from '../servicios/imagenfs.service';
import { ImagenFS } from '../clases/imagenfs';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.page.html',
  styleUrls: ['./graficos.page.scss'],
})
export class GraficosPage implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['']; //ids de fotos
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;

  public barChartData: ChartDataSets[] = [
    { 
      data: [0], 
      label: 'Cantidad de votos' 
    }//cantidad de votos
  ];


  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;

  constructor(public servImagenes: ImagenfsService) {
  }

  ngOnInit() {
    this.cargarGraficosFeas();
    this.cargarGraficosLindas();
  }

  cargarGraficosLindas(){
    if(this.servImagenes.imagenesLindas.length != 0){
      this.pieChartData = this.servImagenes.imagenesLindas.map(
        (item) => {
          return item.votos;
        } 
      );

      this.pieChartLabels = this.servImagenes.imagenesLindas.map(
        (item) => {
          return "Foto N°"+item.id;
        } 
      );
    }
  }

  cargarGraficosFeas(){
    if(this.servImagenes.imagenesFeas.length != 0){
      let data = this.servImagenes.imagenesFeas.map(
        (item) => {
          return item.votos;
        } 
      );

      this.barChartData = [
        { 
          data: data, 
          label: 'Cantidad de votos' 
        }//cantidad de votos
      ];

      this.barChartLabels = this.servImagenes.imagenesFeas.map(
        (item) => {
          return "Foto N°"+item.id;
        } 
      );
    }
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    //console.log(event, active);
    //console.log(active[0]["_model"]["label"]);
    let id_foto = parseInt(active[0]["_model"]["label"].substr(7));
    let imagenQuery = this.servImagenes.traerImagenPorID(id_foto).subscribe(
      (imagenes: ImagenFS[]) => {
        //console.log(imagenes);


        imagenQuery.unsubscribe();
      }
    );
  }
}