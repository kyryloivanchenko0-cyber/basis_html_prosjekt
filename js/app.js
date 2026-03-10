// Minimal dummy JS
(function () {
 
  // Opprettelse av spillvariabler.
  var player = {
    navn : "Ole Pengemann",
    saldo : 10000
  };

  // spelvariabel
  var game = {
    dag:1,
    year: 2026
  }

  // Kategori
  var category = [
    {navn :"Transport",   id: 1},
    {navn :"Olje",        id: 2},
    {navn :"Tech",        id:3},
    {navn :"Diverse",     id:0}
  ]

  // Aksjer
  var stock = [
    {navn: "Statoil",   price : 1000, available: 500,   owned: 0 ,  category:2},
    {navn: "Telenor",   price: 100,   available: 400,   owned: 0,   category: 3},
    {navn: "Tine"   ,   price: 45.5,  available:250,    owned : 0,  category:0},
    {navn: "PingPanic", price: 0.4,   available:100000, owned: 0,   category:3},
    {navn: "Apple",     price: 3299,  available: 2300,  owned:0,    category: 3}
  ]


  // Her er trykk på ny dag knappen
  document.getElementById("newDay").addEventListener("click", () =>
  { 
    runNewDay();
  });

  // her er knappane fra aksjelista
  document.addEventListener("click", function(event){
    // Kjøp knappen ligger her
    if(event.target && event.target.tagName === "BUTTON")
    {
      if(event.target.id=="kjop")
      {
        var stockID = event.target.dataset.stock;
        buyStock(stockID);
      }
      else if(event.target.id=="selg")
      {
        var stockID = event.target.dataset.stock;
        sellStock(stockID);
      }
    }
  });
  
  function sellStock(stockID)
  {
      var currentStock = stock[stockID];
      var antall = parseInt(prompt("How many stocks do you sell?"));
      // TODO sjekk kor mange bruker kan selga
      var totalPris = currentStock.price * antall;

      // salg er godkjent
      player.saldo = player.saldo + totalPris;
      stock[stockID].owned = stock[stockID].owned - antall;
      stock[stockID].available = stock[stockID].available + antall;
      updateGUI();
  }

  function buyStock(stockID)
  {
    var currentStock = stock[stockID];
    var antall = parseInt(prompt("How many stocks do you want?"));

    // Sjekk kor mange akjser er det mulig å kjøpe

    var totalMaximum = Math.round(player.saldo / currentStock.price);
    if(totalMaximum > currentStock.available)
    {
      totalMaximum = currentStock.available;
    }
    if(antall > totalMaximum)
    {
      antall = totalMaximum;
    }
    // Antall = det antallet aksjer me kan kjøpa.
    var totalPris = currentStock.price * antall;

    // Kjøp er godkjent
    player.saldo = player.saldo - totalPris;
    stock[stockID].owned = stock[stockID].owned + antall;
    stock[stockID].available = stock[stockID].available - antall;
    updateGUI();
  }

  // Kode som blir kjørt ved ny dag
  function runNewDay()
  {
    // Kalkuler nye priser på aksjer
    calculateNewPrices();

    // update days and year
    game.dag = game.dag + 1;
    if(game.dag == 10) // TODO change to 365
    {
      game.year = game.year + 1;
      game.dag = 1;
    }

    // update the GUI
    updateGUI();
  }

  // kalkuler nye priser kvar gang denne blir kjørt.
  function calculateNewPrices()
  {
     for(i = 0; i < stock.length; i++ )
      {
        var change = Math.floor(Math.random() * 21) - 10; // mellom -10 + 10
        stock[i].price = stock[i].price + change;
      }
  }

  function updateGUI()
  {
    document.getElementById("dag").innerHTML = game.dag;
    document.getElementById("year").innerHTML = game.year;
    document.getElementById("balance").innerHTML = player.saldo;
    redrawStockList();
  }

  function redrawStockList()
  {
      var divList = document.getElementById("stocklist");
      divList.innerHTML = "";

      for(i = 0; i < stock.length; i++ )
      {
        var info = "";
        info = info + (stock[i].navn + "----");
        info = info +(" Price: " + stock[i].price );
        info = info +(" Dine aksjer: " + stock[i].owned);
        // Kjøp knapp
        info = info + ("<button id='kjop' data-stock='" + i + "'>Kjøp</button>");
        info = info + ("<button id='selg' data-stock='" + i + "'>Selg</button>");
        // Ny linje
        info = info +("<hr>");

        divList.innerHTML = divList.innerHTML + info;
      }
  }


   
   updateGUI();

})();
