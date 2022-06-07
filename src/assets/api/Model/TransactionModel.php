<?php
require_once PROJECT_ROOT_PATH . "/Model/Database.php";

class TransactionModel extends Database
{
  public function getAll()
  {
    return $this->select("SELECT *, amount * unit_price AS 'total' FROM transaction");
  }

  public function getItems()
  {
    return $this->select("SELECT DISTINCT item FROM transaction");
  }

  public function getByIDDate($id, $start, $end)
  {
    return $this->select("SELECT *, amount * unit_price AS total
													FROM transaction
													WHERE (consignor_id = '$id') AND
																(sale_timestamp >= '$start') AND
																(sale_timestamp <= '$end')");
  }
}