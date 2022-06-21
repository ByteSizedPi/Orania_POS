<?php
require __DIR__ . "/config.php";
require __DIR__ . "/Consignor.php";
require __DIR__ . "/Transaction.php";
require __DIR__ . "/Router.php";

$components = parse_url($_SERVER['REQUEST_URI'], PHP_URL_QUERY);
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$params = '';

if (isset($components))
  parse_str($components, $params);

$router = new Router($uri);

$consignor = new Consignor();
$transaction = new Transaction();
$consignor->init();
$transaction->init();

$router->get('consignor', $consignor->getAll);
$router->get('consignor/ids', $consignor->getIDs);
$router->get('consignor/names', $consignor->getNames);
$router->get('transaction/invoice', $transaction->getInvoice);
$router->get('transaction/items', $transaction->getItems);
$router->get('transaction/day', $transaction->getAllByDay);
$router->get('transaction/week', $transaction->getAllByWeek);
$router->get('transaction/month', $transaction->getAllByMonth);
$router->get('transaction/year', $transaction->getAllByYear);
$router->get(
  'transaction/subset',
  fn () => ($transaction->getByIDDate)($params['id'], $params['start'], $params['end'])
);

$router->post('transaction/invoice', $transaction->updateInvoice);
$router->listen();
