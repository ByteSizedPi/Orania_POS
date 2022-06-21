<?php
require_once __DIR__ . "/Controller.php";
require_once __DIR__ . "/config.php";

class POST_Transaction extends Controller
{
  function init()
  {
    $transactions = json_decode(file_get_contents('php://input'), true);
    $insert_string = 'INSERT INTO transaction (item, amount, unit_price, consignor_id) VALUES ';
    foreach ($transactions as $transaction) {
      $item = $transaction['item'];
      $amount = $transaction['amount'];
      $unit_price = $transaction['unit_price'];
      $consignor_id = $transaction['consignor_id'];
      $insert_string .= "('$item', $amount, $unit_price, '$consignor_id'),";
    }
    $insert_string = substr($insert_string, 0, -1);
    $this->query($insert_string);
  }
}
(new POST_Transaction)->init();
