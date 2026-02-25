$body = @{
    repo = "https://h04sh.github.io/portfolio/"
    team = "BUG_RIPPER"
    leader = "HARSH_VALIYAN"
} | ConvertTo-Json

$headers = @{
    "Content-Type" = "application/json"
    "X-API-Key" = "bugripper_2024_secure_key_harsh_valiyan"
}

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/analyze" -Method Post -Headers $headers -Body $body -ErrorAction Stop
    Write-Host "Success:" -ForegroundColor Green
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Host "Error Response:" -ForegroundColor Red
    $_.Exception.Response.StatusCode
    $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
    $reader.BaseStream.Position = 0
    $reader.DiscardBufferedData()
    $responseBody = $reader.ReadToEnd()
    Write-Host $responseBody
}
