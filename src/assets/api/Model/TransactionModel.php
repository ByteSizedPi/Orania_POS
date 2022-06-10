<?php
require_once PROJECT_ROOT_PATH . "/Model/Database.php";

class TransactionModel extends Database
{
  public function getAll()
  {
    $this->GET(
      fn () => $this->select("SELECT *, amount * unit_price AS 'total' FROM transaction")
    );
    // return $this->select("SELECT *, amount * unit_price AS 'total' FROM transaction");
  }

  public function getItems()
  {
    // $ids = $this->transaction->getItems();
    // $filtered = array_map(fn ($val) => $val['item'], $items);
    // return $this->select("SELECT DISTINCT item FROM transaction");

    $this->GET(
      fn () => $this->select("SELECT DISTINCT item FROM transaction"),
      fn ($items) => array_map(fn ($val) => $val['item'], $items)
    );
  }

  public function getByIDDate($id, $start, $end)
  {
    $this->GET(fn () => $this->transaction->getByIDDate($id, $start, $end));
    return $this->select("SELECT *, amount * unit_price AS total
													FROM transaction
													WHERE (consignor_id = '$id') AND
																(sale_timestamp >= '$start') AND
																(sale_timestamp <= '$end')");
  }
}