<?php
include '../database.php';

$consignors = [];
$sql = "SELECT consignor_id FROM consignor";

if ($result = $db->query($sql)) {
	$i = 0;
	while ($row = $result->fetch_assoc()) {
		$consignors[$i]['consignor_id']    = $row['consignor_id'];
		$i++;
	}

	echo json_encode($consignors);
} else {
	http_response_code(404);
}
