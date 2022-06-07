<?php
	include 'database.php';

	$consignors = [];
	$sql = "SELECT DISTINCT item FROM transaction";

	if($result = $db->query($sql))
	{
		$i = 0;
		while($row = $result->fetch_assoc())
		{
			$consignors[$i]['item'] = $row['item'];
			$i++;
		}

		echo json_encode($consignors);
	}
	else
	{
		http_response_code(404);
	}
?>