$body = @{
    email = 'test@example.com'
    password = 'password123'
    name = 'Test User'
} | ConvertTo-Json

try {
    $response = Invoke-WebRequest -Uri 'http://127.0.0.1:8787/api/signup' -Method Post -ContentType 'application/json' -Body $body
    "Status: $($response.StatusCode)"
    "Response: $($response.Content)"
} catch {
    "Error: $_"
    if ($_.Exception.Response) {
        $responseStream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($responseStream)
        $responseBody = $reader.ReadToEnd()
        "Response Body: $responseBody"
    }
} 