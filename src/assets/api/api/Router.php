<?php
class Router
{
  private $gets = [], $posts = [], $deletes = [];
  private $uri;

  function __construct(string $uri)
  {
    $uri = explode('/', $uri);

    if (!isset($uri[2])) {
      header("HTTP/1.1 404 Not Found");
      exit();
    }

    $this->uri = array_slice($uri, 3);
  }

  public function get(string $path, callable $handler)
  {
    array_push($this->gets, new Route($path, $handler));
  }

  public function post(string $path, callable $handler)
  {
    array_push($this->posts, new Route($path, $handler));
  }

  private function loopArr(array $arr)
  {
    foreach ($arr as $route)
      if ($route->path == $this->uri) return ($route->handler)();
    header('HTTP/1.1 404 Not Found');
    echo '';
  }


  private function errorMethod()
  {
    header('Content-Type: application/json');
    header('HTTP/1.1 422 Unprocessable Entity');
    echo json_encode(array('error' => 'Method not supported'));
    exit;
  }

  public function listen()
  {
    $method = strtoupper($_SERVER["REQUEST_METHOD"]);
    switch ($method) {
      case 'GET':
        $this->loopArr($this->gets);
        break;
      case 'POST':
        $this->loopArr($this->posts);
        break;
      case 'DELETE':
        $this->loopArr($this->deletes);
        break;
      default:
        $this->errorMethod();
    }
  }
}

class Route
{
  public $path, $handler;
  function __construct(string $path, callable $handler)
  {
    $this->path = explode('/', $path);
    $this->handler = $handler;
  }
}