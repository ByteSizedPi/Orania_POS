<?php
class Controller
{
  protected $connection = null;

  public function __construct()
  {
    try {
      $this->connection = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

      if (mysqli_connect_errno()) {
        throw new Exception("Could not connect to database.");
      }
    } catch (Exception $e) {
      throw new Exception($e->getMessage());
    }
  }

  public function select(string $query = "", $params = [])
  {
    try {
      $stmt = $this->executeStatement($query, $params);
      $res = $stmt->get_result();
      if (is_bool($res)) {
        $result = $stmt->get_result();
      } else {
        $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
      }
      $stmt->close();

      return $result;
    } catch (Exception $e) {
      throw new Exception($e->getMessage());
    }
    return false;
  }

  private function executeStatement(string $query = "", $params = [])
  {
    try {
      $stmt = $this->connection->prepare($query);

      if ($stmt === false) {
        throw new Exception("Unable to do prepared statement: " . $query);
      }

      if ($params) {
        $stmt->bind_param($params[0], $params[1]);
      }

      $stmt->execute();

      return $stmt;
    } catch (Exception $e) {
      throw new Exception($e->getMessage());
    }
  }

  protected function query(string $query, callable $format = null)
  {
    try {
      $data = $this->select($query);
      if (!is_null($format)) $data = $format($data);
      $httpHeaders = array('Content-Type: application/json', 'HTTP/1.1 200 OK');
    } catch (Error $e) {
      $data = array('error' => $e->getMessage() . ' -Internal Server Error.');
      $httpHeaders = array('Content-Type: application/json', 'HTTP/1.1 500 Internal Server Error');
    }

    header_remove('Set-Cookie');

    if (is_array($httpHeaders) && count($httpHeaders)) {
      foreach ($httpHeaders as $httpHeader) {
        header($httpHeader);
      }
    }

    echo json_encode($data);
    exit;
  }
}