<?php
class Database
{
  public $connection = null;
  public function connect()
  {
    if (!is_null($this->connection)) return $this->connection;
    try {
      $this->connection = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

      if (mysqli_connect_errno()) {
        throw new Exception("Could not connect to database.");
      }
    } catch (Exception $e) {
      throw new Exception($e->getMessage());
    }
    return $this->connection;
  }
}