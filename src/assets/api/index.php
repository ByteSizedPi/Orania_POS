<?php
require __DIR__ . "/inc/bootstrap.php";
require PROJECT_ROOT_PATH . "/Controller/ConsignorController.php";
require PROJECT_ROOT_PATH . "/Controller/TransactionController.php";
require PROJECT_ROOT_PATH . "/Model/Router.php";

$components = parse_url($_SERVER['REQUEST_URI'], PHP_URL_QUERY);
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$params = '';
if (isset($components))
	parse_str($components, $params);

$router = new Router($uri, $params);

$consignor = new ConsignorController();
$transaction = new TransactionController();

$router->get('consignor', fn () => $consignor->getAll());
$router->get('consignor/ids', fn () => $consignor->getIDs());
$router->get('transaction/items', fn () => $transaction->getItems());
$router->get(
	'transaction/subset',
	fn () =>	$transaction->getByIDDate($params['id'], $params['start'], $params['end'])
);
