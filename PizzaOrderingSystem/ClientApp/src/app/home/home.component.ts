import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  headers = ["Small", "Medium", "Large", "Extra Large"];
  vegtop = [{ "Name": "Tomatoes", "Value": 1.00, "SCheck": false, "MCheck": false, "LCheck": false, "XCheck": false },
  { "Name": "Onions", "Value": 0.50, "SCheck": false, "MCheck": false, "LCheck": false, "XCheck": false },
  { "Name": "Bell Peppers", "Value": 1.00, "SCheck": false, "MCheck": false, "LCheck": false, "XCheck": false },
  { "Name": "Mushrooms", "Value": 1.20, "SCheck": false, "MCheck": false, "LCheck": false, "XCheck": false },
  { "Name": "Pineapple", "Value": 0.75, "SCheck": false, "MCheck": false, "LCheck": false, "XCheck": false }];

  meattop = [{ "Name": "Sausage", "Value": 1.00, "SCheck": false, "MCheck": false, "LCheck": false, "XCheck": false },
  { "Name": "Pepperoni", "Value": 2.00, "SCheck": false, "MCheck": false, "LCheck": false, "XCheck": false },
  { "Name": "BBQ Chicken", "Value": 3.00, "SCheck": false, "MCheck": false, "LCheck": false, "XCheck": false }];

  offers = [{ "Name": "Offer1", "Value": 1.00 }, { "Name": "Offer2", "Value": 2.00 }, { "Name": "Offer3", "Value": 3.00 }];
  //constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
  //  http.get<WeatherForecast[]>(baseUrl + 'weatherforecast').subscribe(result => {
  //    this.forecasts = result;
  //  }, error => console.error(error));
  //}

  //constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
  //  http.get(baseUrl + 'weatherforecast').subscribe(error => console.error(error));
  //}

  public getQuantity(s, m, l, x) {
    var sqty = parseFloat(s);
    var mqty = parseFloat(m);
    var lqty = parseFloat(l);
    var xqty = parseFloat(x);
    var total = 0.0;

    //get all checked checkboxes in the list
    var checkboxes = document.getElementById("pizzatable").querySelectorAll("input[type='checkbox']");
    var checked = [].filter.call(checkboxes, function (el) {
      return el.checked;
    })

    //store the selected values in arrays for processing (for offers)
    var smalltoppings = new Array();
    var mediumtoppings = new Array();
    var largetoppings = new Array();
    var xltoppings = new Array();

    checked.forEach(function (checkbox) {
      var name = checkbox.getAttribute("name")
      var lastChar = name.substr(name.length - 1);

      if (lastChar == 'S') {
        if (!isNaN(sqty) && sqty > 0)
          smalltoppings.push(checkbox.value);
      }
      else if (lastChar == 'M') {
        if (!isNaN(mqty) && mqty > 0)
          mediumtoppings.push(checkbox.value);
      }
      else if (lastChar == 'L') {
        if (!isNaN(lqty) && lqty > 0)
          largetoppings.push(checkbox.value);

      } else if (lastChar == 'X') {
        if (!isNaN(xqty) && xqty > 0)
          xltoppings.push(checkbox.value);
        //total += xqty * checkbox.value;
      }
    })

    //process total price with offers
    if (!isNaN(sqty)) {
      smalltoppings.forEach(function (topping) {
        total += topping * sqty;
      })
      total += 5 * sqty;
    }


    if (!isNaN(mqty)) {
      if (mqty == 1 && mediumtoppings.length == 2) { //1 medium pizza in order with 2 toppings for $5
        total += 5;
        document.getElementById('lblOffers').innerHTML += "Offer 1 ";
      }
      else if (mqty == 2 && mediumtoppings.length == 4) { //2 mediums with 4 toppings for $9
        total += 9;
        document.getElementById('lblOffers').innerHTML += "Offer 2 ";
      }
      else {
        mediumtoppings.forEach(function (topping) {
          total += topping * mqty;
        })
        total += 7 * mqty;
      }
    }


    if (!isNaN(lqty)) {
      if (lqty == 1 && largetoppings.length == 4) { //1 large pizza with 4 toppings in order for 50% off
        largetoppings.forEach(function (topping) {
          total += topping * lqty;
        })
        total += 8;
        total /= 2;
        document.getElementById('lblOffers').innerHTML += "Offer 3 ";
      }
      else {
        largetoppings.forEach(function (topping) {
          total += topping * lqty;
        })
        total += 8;
      }
    }

    if (!isNaN(xqty)) {
      xltoppings.forEach(function (topping) {
        total += topping * xqty;
      })
      total += 9 * xqty;
    }


    document.getElementById('lblTotal').innerHTML = "$" + total.toString();

  }
}
