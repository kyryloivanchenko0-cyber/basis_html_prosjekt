// Minimal dummy JS
(function () {
 

  // Opprettelse av spillvariabler.
  var player = {
    navn : "Ole PengeMann",
    saldo : 10000
  };


  // spelvariabel
  var game = {
    dag:1,
    year: 2026
  }

  // Kategori
  var categori = [
    {navn : "Transport", id : 1},
    {navn : "Olje", id : 2},
    {navn : "Tech", id : 3},
    {navn : "Diverse", id : 0},
  ]

  // Aksjer
  var stocks =[
    {navn : "Statoil", price : 1000, available : 500, owned : 0, category : 2},
    {navn : "Telenor", price : 100, available : 400, owned : 0, category : 3},
    {navn : "Tine", price : 45.5, available : 250, owned : 0, category : 0},
    {navn : "PingPanic", price : 0.4, available : 100000, owned : 0, category : 3},
    {navn : "Apple", price : 3299, available : 2300, owned : 0, category : 3},
  ]


  // Her er trykk på ny dag kanppen
  document.getElementById("NewDay").addEventListener("click", () => 
    {
      runNewDay();
  });


// Kode som blir kjørt ved ny dag
function runNewDay()
{
// Kalkuler nye priser på aksjer
// Update days and year
game.dag = game.dag + 1;
if(game.dag == 10)
{
  game.year = game.year + 1;
  game.dag = 1;
}
// Update the GUI
updateGUI();
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
  var divlist = document.getElementById("stocklist");
  divlist.innerHTML = "";
  for( i = 0; i < stocks.length; i++ )
  {

    var info = "";
    info = info + ((stocks[i].navn + "----<br>"));
    info = info + (("Price: " + stocks[i].price + "<br>"));
    info = info + (("Dine aksjer: " + stocks[i].owned + "<br>"));
    // Kjøp knapp
    info = info +("<button id='kjop' data-stock='" + i + "'>Kjøp</button>");
    info = info +("<button id='selg' data-stock='" + i + "'>Selg</button>");
    // Ny linje
    info = info + ("<hr>");

    divlist.innerHTML = divlist.innerHTML + info;
  }

}






updateGUI();

})();
