<?php
require_once __DIR__ . "/Controller.php";

class Consignor extends Controller
{
  public $getAll, $getIDs, $getNames;

  public function init()
  {
    $this->getAll = function () {
      $this->query("SELECT * FROM consignor");
    };

    $this->getNames = function () {
      $this->query("SELECT consignor_id, name_surname FROM consignor");
    };

    $this->getIDs = function () {
      $this->query(
        "SELECT consignor_id FROM consignor",
        fn ($ids) => array_map(fn ($val) => $val['consignor_id'], $ids)
      );
    };
  }
}