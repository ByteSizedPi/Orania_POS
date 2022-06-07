<?php
class ConsignorController extends BaseController
{
	public ConsignorModel $consignor;

	function __construct()
	{
		$this->consignor = new ConsignorModel();
	}

	public function getAll()
	{
		$this->GET(fn () => $this->consignor->getAll());
	}

	public function getIDs()
	{
		$ids = $this->consignor->getIDs();
		$filtered = array_map(fn ($val) => $val['consignor_id'], $ids);
		$this->GET(fn () => $filtered);
	}
}