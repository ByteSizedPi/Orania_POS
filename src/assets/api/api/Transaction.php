<?php
require_once __DIR__ . "/Controller.php";

class Transaction extends Controller
{
  public $getAll, $getItems, $getByIDDate, $getInvoice, $getAllByDay, $getAllByWeek, $getAllByMonth, $getAllByYear, $updateInvoice;
  public function init()
  {
    $this->getAll = function () {
      $this->query("SELECT *, amount * unit_price AS 'total' FROM transaction");
    };

    $this->getAllByDay = function () {
      $this->query(
        "SELECT DATE_FORMAT(sale_timestamp, '%d/%m/%Y') date,
	              DAYNAME(sale_timestamp) day,
                SUM(amount * unit_price) total
        FROM `transaction`
        GROUP BY date, day;"
      );
    };

    $this->getAllByWeek = function () {
      $this->query(
        "SELECT	WEEK(sale_timestamp) AS week,
                DATE_SUB(
                  DATE_ADD(
                    MAKEDATE(YEAR(sale_timestamp), 1),
                    INTERVAL WEEK(sale_timestamp) WEEK
                  ),
                  INTERVAL WEEKDAY(
                    DATE_ADD(
                      MAKEDATE(YEAR(sale_timestamp), 1),
                      INTERVAL WEEK(sale_timestamp) WEEK
                    )
                  ) -1 DAY) AS week_start,
                SUM(unit_price * amount) AS total
        FROM transaction
        GROUP BY week, week_start"
      );
    };

    $this->getAllByMonth = function () {
      $this->query("SELECT MONTH(sale_timestamp) month,
                            MONTHNAME(sale_timestamp) month_name,
                            SUM(unit_price * amount) total
                    FROM `transaction`
                    GROUP BY month, month_name");
    };

    $this->getAllByYear = function () {
      $this->query("SELECT YEAR(sale_timestamp) year,
                            SUM(amount * unit_price) total
                    FROM `transaction`
                    GROUP BY year;");
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
