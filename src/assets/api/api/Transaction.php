<?php
require_once PROJECT_ROOT_PATH . "/api/Controller.php";

class Transaction extends Controller
{
  public $getAll, $getItems, $getByIDDate, $getInvoice, $updateInvoice;
  public function init()
  {
    $this->getAll = function () {
      $this->query("SELECT *, amount * unit_price AS 'total' FROM transaction");
    };

    $this->getItems = function () {
      $this->query(
        "SELECT DISTINCT item FROM transaction",
        fn ($items) => array_map(fn ($val) => $val['item'], $items)
      );
    };

    $this->getByIDDate = function ($id, $start, $end) {
      $this->query("SELECT *, amount * unit_price AS total
								  FROM transaction
								  WHERE (consignor_id = '$id') AND
											(sale_timestamp >= '$start') AND
											(sale_timestamp <= '$end')");
    };

    $this->getInvoice = function () {
      $this->query(
        "SELECT * FROM invoice",
        fn ($invoice) => array_map(fn ($val) => $val['invoice_nr'], $invoice)[0]
      );
    };

    $this->updateInvoice = function () {
      $this->query("UPDATE invoice SET invoice_nr = invoice_nr + 1");
    };
  }
}