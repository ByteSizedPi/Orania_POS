<?php
include '../database.php';
$postdata = file_get_contents('php://input');

if (isset($postdata) && !empty($postdata)) {
  $newConsignor = json_decode($postdata, true);

  $name_surname = $newConsignor['name_surname'];
  $consignor_id = $newConsignor['consignor_id'];
  $cell_nr = $newConsignor['cell_nr'];

  //insert transactions
  $insert_string = "INSERT INTO consignor (consignor_id, name_surname, cell_nr)
										VALUES ('$consignor_id', '$name_surname', '$cell_nr')";

  if ($db->query($insert_string)) {
    http_response_code(201);
  } else {
    http_response_code(422);
  }
}
