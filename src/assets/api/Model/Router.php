<?php
class Router
{
	private $uri;
	private $params;
	function __construct(string $uri, $params)
	{
		$uri = explode('/', $uri);

		if (!isset($uri[2])) {
			header("HTTP/1.1 404 Not Found");
			exit();
		}

		$this->uri = array_slice($uri, 2);
		$this->params = $params;
	}

	public function get($path, $handler)
	{
		if ($path == '*') return $handler();
		$path =	explode('/', $path);

		if (count($path) != count($this->uri)) return;

		for ($i = 0; $i < count($path); $i++)
			if ($path[$i] != $this->uri[$i]) return;

		$handler();
	}
}
