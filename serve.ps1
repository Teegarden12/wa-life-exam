# Simple static file server for wa-life-exam
# Run: powershell -ExecutionPolicy Bypass -File serve.ps1
$port = 3737
$root = $PSScriptRoot
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Host "Serving at http://localhost:$port/ (Ctrl+C to stop)"

$mimes = @{
  '.html'='text/html'; '.css'='text/css'; '.js'='application/javascript';
  '.json'='application/json'; '.png'='image/png'; '.ico'='image/x-icon'
}

while ($listener.IsListening) {
  $ctx = $listener.GetContext()
  $req = $ctx.Request; $res = $ctx.Response
  $path = $req.Url.LocalPath -replace '/', '\'
  if ($path -eq '\') { $path = '\index.html' }
  $file = Join-Path $root $path.TrimStart('\')
  if (Test-Path $file -PathType Leaf) {
    $ext = [IO.Path]::GetExtension($file)
    $ct = $mimes[$ext]; if (-not $ct) { $ct = 'application/octet-stream' }; $res.ContentType = $ct
    $res.AddHeader("Cache-Control", "no-store, no-cache, must-revalidate")
    $bytes = [IO.File]::ReadAllBytes($file)
    $res.ContentLength64 = $bytes.Length
    $res.OutputStream.Write($bytes, 0, $bytes.Length)
  } else {
    $res.StatusCode = 404
  }
  $res.OutputStream.Close()
}
