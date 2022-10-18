import {  AfterViewInit, Component, ElementRef, ViewChild  } from '@angular/core'

import { Chart,registerables  } from 'chart.js'
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {
  @ViewChild('barCanvas') private barCanvas: ElementRef;
  barChart: any;
  moods = {
    happy: null,
    sad: null,
    relaxed: null,
    stressed: null
  };

  constructor(public alertController: AlertController) {
    Chart.register(...registerables)
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Mood point is out of range!',
      message: 'Please enter mood point within the range of 1 - 20',
      buttons: ['OK']
    });

    await alert.present();
  }

  validatePointRange(point) {
    return point >= 1 && point <= 20;
  }
  
  updateChart(form){
    if(!this.validatePointRange(this.moods.happy) || !this.validatePointRange(this.moods.sad) || !this.validatePointRange(this.moods.relaxed) || !this.validatePointRange(this.moods.stressed)){
      this.presentAlert()
      return
    }
    this.moods.happy = form.value.happy
    this.moods.sad = form.value.sad
    this.moods.relaxed = form.value.relaxed
    this.moods.stressed = form.value.stressed
    this.barChart.data.datasets[0].data = [this.moods.happy, this.moods.sad, this.moods.relaxed, this.moods.stressed]
    this.barChart.update()
  }

  ngAfterViewInit() {
    this.barChartMethod()
  }

  barChartMethod() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Happy', 'Sad', 'Relaxed', 'Stressed'],
        datasets: [{
          label: '# of Points',
          data: [this.moods.happy, this.moods.sad, this.moods.relaxed, this.moods.stressed],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          }
        },
        scales: {
          yAxes:{
            max:20,
            min:0
          }
        }
      },
    })
  }

  exitApp(){
    console.log('Exit app')
    
  }

}
