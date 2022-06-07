<?php
include '../database.php';
$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
	$queryparams = json_decode($postdata, true);

	$date = $queryparams['date'];

	$query = "SELECT consignor_id, name_surname, DATE(sale_timestamp) AS date, SUM(amount * unit_price) AS total
						FROM transaction natural join consignor
						WHERE DATE(sale_timestamp) = '$date'
						GROUP BY consignor_id, DATE(sale_timestamp)";


	$transactions = [];
	if ($result = $db->query($query)) {
		$i = 0;
		while ($row = $result->fetch_assoc()) {
			$transactions[$i]['consignor_id'] = $row['consignor_id'];
			$transactions[$i]['name_surname'] = $row['name_surname'];
			$transactions[$i]['date'] = $row['date'];
			$transactions[$i]['total'] = $row['total'];
			$i++;
		}
		echo json_encode($transactions);
	} else {
		http_response_code(422);
	}
}