<?php
include '../database.php';
$postdata = file_get_contents('php://input');

if (isset($postdata) && !empty($postdata)) {
	//update sequence
	if (!$db->query('UPDATE sequence SET id = id + 1')) {
		http_response_code(422);
	}

	//insert transactions
	$insert_string = 'INSERT INTO transaction (item, amount, unit_price, consignor_id, sequence) VALUES';
	$transactions = json_decode($postdata, true);

	foreach ($transactions as $transaction) {
		$item = $transaction['item'];
		$amount = $transaction['amount'];
		$unit_price = $transaction['unit_price'];
		$consignor_id = $transaction['consignor_id'];
		$insert_string .= "('$item', $amount, $unit_price, '$consignor_id', (SELECT MAX(id) from sequence)),";
	}
	$insert_string = substr($insert_string, 0, -1);

	if ($db->query($insert_string)) {
		http_response_code(201);
	} else {
		http_response_code(422);
	}
}