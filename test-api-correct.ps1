$body = @{
    repo = "https://github.com/h04sh/portfolio"
    team = "BUG_RIPPER"
    leader = "HARSH_VALIYAN"
} | ConvertTo-Json

$headers = @{
    "Content-Type" = "application/json"
    "X-API-Key" = "bugripper_2024_secure_key_harsh_valiyan"
}

Write-Host "Testing with CORRECT URL: https://github.com/h04sh/portfolio" -ForegroundColor Cyan
Write-Host "This will take 30-60 seconds as it clones and analyzes the repository..." -ForegroundColor Yellow
Write-Host ""

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/analyze" -Method Post -Headers $headers -Body $body -ErrorAction Stop -TimeoutSec 120
    Write-Host "✅ SUCCESS!" -ForegroundColor Green
    Write-Host ""
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Host "❌ Error Response:" -ForegroundColor Red
    Write-Host "Status Code:" $_.Exception.Response.StatusCode
    $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
    $reader.BaseStream.Position = 0
    $reader.DiscardBufferedData()
    $responseBody = $reader.ReadToEnd()
    Write-Host $responseBody
}
