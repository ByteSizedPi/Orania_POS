<?php
require_once __DIR__ . "/Controller.php";
require_once __DIR__ . "/config.php";

class POST_Consignor extends Controller
{
  function init()
  {
    $newConsignor = json_decode(file_get_contents('php://input'), true);
    $name_surname = $newConsignor['name_surname'];
    $consignor_id = $newConsignor['consignor_id'];
    $cell_nr = $newConsignor['cell_nr'];

    $insert_string = "INSERT INTO consignor (consignor_id, name_surname, cell_nr)
										VALUES ('$consignor_id', '$name_surname', '$cell_nr')";
    $this->query($insert_string);
  }
}
(new POST_Consignor)->init();