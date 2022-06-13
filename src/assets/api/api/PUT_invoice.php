<?php
require_once __DIR__ . "/Controller.php";
require_once __DIR__ . "/config.php";

class PUTInvoice extends Controller
{
  function init()
  {
    $this->query("UPDATE invoice SET invoice_nr = invoice_nr + 1");
  }
}
(new PUTInvoice)->init();