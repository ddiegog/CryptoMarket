import { Injectable } from '@angular/core';

declare global {
  interface Window { ethereum: any; }
}

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  connectMetamask(): Promise<string> {
    return new Promise((resolve, reject) => {
        if (typeof window.ethereum !== 'undefined') {
            //alert('MetaMask is installed!');

            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then((accounts:any) => resolve(accounts[0]))
                .catch((err:any) => {
                    if (err.code === 4001) {
                        // El usuario rechazó la solicitud
                        alert('Please connect to MetaMask.');
                        reject('Please connect to MetaMask.');
                    } else {
                        console.error(err);
                        reject(err);
                    }
                });

        } else {
            alert('Install MetaMask!');
            reject('Install MetaMask!');
        }
    });
  }

  constructor() { }
}
