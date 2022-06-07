<?php
include '../database.php';

$consignors = [];
$sql = "SELECT * FROM consignor";

if ($result = $db->query($sql)) {
	$i = 0;
	while ($row = $result->fetch_assoc()) {
		$consignors[$i]['consignor_id'] = $row['consignor_id'];
		$consignors[$i]['name_surname'] = $row['name_surname'];
		$consignors[$i]['registered_date'] = $row['registered_date'];
		$consignors[$i]['cell_nr'] = $row['cell_nr'];
		$i++;
	}
	echo json_encode($consignors);
} else {
	http_response_code(404);
}
