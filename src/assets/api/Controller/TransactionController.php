<?php
class TransactionController extends BaseController
{
	public TransactionModel $transaction;

	function __construct()
	{
		$this->transaction = new TransactionModel();
	}

	public function getAll()
	{
		$this->GET(fn () => $this->transaction->getAll());
	}

	public function getItems()
	{
		$ids = $this->transaction->getItems();
		$filtered = array_map(fn ($val) => $val['item'], $ids);
		$this->GET(fn () => $filtered);
	}

	public function getByIDDate($id, $start, $end)
	{
		$this->GET(fn () => $this->transaction->getByIDDate($id, $start, $end));
	}
}