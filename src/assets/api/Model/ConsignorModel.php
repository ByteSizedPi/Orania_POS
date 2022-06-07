<?php
require_once PROJECT_ROOT_PATH . "/Model/Database.php";

class ConsignorModel extends Database
{
	public function getAll()
	{
		return $this->select("SELECT * FROM consignor");
	}

	public function getIDs()
	{
		return $this->select("SELECT consignor_id FROM consignor");
	}
}