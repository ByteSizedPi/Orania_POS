<?php
class BaseController
{
  /**
   * __call magic method.
   */
  public function __call($name, $arguments)
  {
    $this->sendOutput('', array('HTTP/1.1 404 Not Found'));
  }

  /**
   * Get URI elements.
   *
   * @return array
   */
  protected function getUriSegments()
  {
    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $uri = explode('/', $uri);

    return $uri;
  }

  /**
   * Get querystring params.
   *
   * @return array
   */
  protected function getQueryStringParams()
  {
    return parse_str($_SERVER['QUERY_STRING'], $query);
  }

  /**
   * Send API output.
   *
   * @param mixed  $data
   * @param string $httpHeader
   */
  protected function sendOutput($data, $httpHeaders = array())
  {
    header_remove('Set-Cookie');

    if (is_array($httpHeaders) && count($httpHeaders)) {
      foreach ($httpHeaders as $httpHeader) {
        header($httpHeader);
      }
    }

    echo $data;
    exit;
  }

  private function parseRequest(string $method)
  {
    $requestMethod = $_SERVER["REQUEST_METHOD"];

    if (strtoupper($requestMethod) != $method) {
      $this->sendOutput(
        json_encode(array('error' => 'Method not supported')),
        array('Content-Type: application/json', 'HTTP/1.1 422 Unprocessable Entity')
      );
    }
  }

  protected function GET($query, $format = null)
  {
    $this->parseRequest('GET');

    try {
      $data = $query();
      if (!is_null($format)) $data = $format($data);

      $this->sendOutput(
        json_encode($data),
        array('Content-Type: application/json', 'HTTP/1.1 200 OK')
      );
    } catch (Error $e) {
      $this->sendOutput(
        json_encode(array('error' => $e->getMessage() . ' -Internal Server Error.')),
        array('Content-Type: application/json', 'HTTP/1.1 500 Internal Server Error')
      );
    }
  }
}
