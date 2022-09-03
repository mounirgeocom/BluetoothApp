import { Component } from '@angular/core';
import { BluetoothClassicSerialPort } from '@awesome-cordova-plugins/bluetooth-classic-serial-port/ngx';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  pairedList = [];
  listToggle= false;

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private bluetoothSerial: BluetoothClassicSerialPort,) {
    this.checkBluetoothEnabled();
  }

  checkBluetoothEnabled() {
    this.bluetoothSerial.isEnabled().then(success => {
      this.listPairedDevices();
    }, error => {
      this.showError(` Please Enable Bluetooth `);
    });
  }

  listPairedDevices() {
    this.bluetoothSerial.list().then(success => {
      this.pairedList = success;
      this.listToggle = true;
    }, error => {
      this.showError(`Please Enable Bluetooth`);
      this.listToggle = false;
    });
  }


  async showError(error:string) {
    const myAlert = this.alertCtrl.create({
      header: 'Error',
      subHeader: error
    });

   await (await myAlert).present();
  }

}
