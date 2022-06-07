<?php
include '../database.php';
$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
	$queryparams = json_decode($postdata, true);

	$id = $queryparams['id'];
	$start = $queryparams['start'];
	$end = $queryparams['end'];

	$query = "SELECT *, amount * unit_price AS total
							FROM transaction
							WHERE (consignor_id = '$id') AND
										(sale_timestamp > '$start') AND
										(sale_timestamp < '$end')";


	$transactions = [];
	if ($result = $db->query($query)) {
		$i = 0;
		while ($row = $result->fetch_assoc()) {
			$transactions[$i]['item'] = $row['item'];
			$transactions[$i]['amount'] = $row['amount'];
			$transactions[$i]['unit_price'] = $row['unit_price'];
			$transactions[$i]['sale_timestamp'] = $row['sale_timestamp'];
			$transactions[$i]['total'] = $row['total'];
			$i++;
		}
		echo json_encode($transactions);
	} else {
		http_response_code(422);
	}
}
