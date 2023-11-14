import { Component, WritableSignal, computed, signal, effect, EffectRef } from '@angular/core';
import { FormControl, UntypedFormControl } from '@angular/forms';
import _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() {

  }

  private nameEffect = effect(() => {
    console.log(`Name value : ${this.name.value()}`);
  });

  count = 0;

  items = [    { name: 'Product A', price: 10 },    { name: 'Product B', price: 15 },    { name: 'Product C', price: 20 },  ];

  // Define a signal for the list of items
  itemList = signal(this.items);
  
  // Define a computed value for the total price
  totalPrice = computed(() => {
    return this.itemList().reduce((acc, curr) => acc + curr.price, 0);
  });
  
  nameSignal : WritableSignal<string> = signal('test');
  name : UntypedFormControl = new FormControl(this.nameSignal);
  

  changeName() {
    this.name.value.set('updated name' + this.count.toString());
    this.count++;
    console.log(this.count);
    if(this.count == 5) {
      this.nameEffect.destroy();
    }
  }

  removeItem(item: { name: string; price: number; }) {
    // Update the itemList signal by removing the selected item
    this.itemList.set(this.itemList().filter((i) => i !== item));
    console.log(this.itemList());
  }
  
}
