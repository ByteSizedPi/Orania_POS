<?php
include '../database.php';

$transactions = [];
$sql = "SELECT *, amount * unit_price AS 'total' FROM transaction";

if ($result = $db->query($sql)) {
	$i = 0;
	while ($row = $result->fetch_assoc()) {
		$transactions[$i]['transaction_id'] = $row['transaction_id'];
		$transactions[$i]['item'] = $row['item'];
		$transactions[$i]['amount'] = $row['amount'];
		$transactions[$i]['unit_price'] = $row['unit_price'];
		$transactions[$i]['sale_timestamp'] = $row['sale_timestamp'];
		$transactions[$i]['sequence'] = $row['sequence'];
		$transactions[$i]['total'] = $row['total'];
		$transactions[$i]['consignor_id'] = $row['consignor_id'];
		$i++;
	}
	echo json_encode($transactions);
} else {
	http_response_code(404);
}