<?php
include '../database.php';
$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
	$queryparams = json_decode($postdata, true);

	$id = $queryparams['id'];
	$start = $queryparams['start'];
	$end = $queryparams['end'];

	$query = "SELECT item, SUM(amount) AS 'count', unit_price * SUM(amount) AS 'total', DATE(sale_timestamp) AS 'sale_timestamp'
						FROM transaction
						WHERE (consignor_id = '$id') AND (sale_timestamp >= '$start') AND (sale_timestamp < '$end')
						GROUP BY item, unit_price, sale_timestamp
						ORDER BY sale_timestamp ASC;";

	$transactions = [];
	if ($result = $db->query($query)) {
		$i = 0;
		while ($row = $result->fetch_assoc()) {
			$transactions[$i]['item'] = $row['item'];
			$transactions[$i]['count'] = $row['count'];
			$transactions[$i]['total'] = $row['total'];
			$transactions[$i]['sale_timestamp'] = $row['sale_timestamp'];
			$i++;
		}
		echo json_encode($transactions);
	} else {
		http_response_code(404);
	}
}