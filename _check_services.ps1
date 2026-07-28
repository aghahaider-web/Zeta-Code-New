Get-ChildItem -Path 'C:\Users\Haider\ZetaCode\app\(public)\services' -Recurse -File |
  ForEach-Object { $_.FullName } |
  Out-File -FilePath 'C:\Users\Haider\ZetaCode\_check_services.txt' -Encoding utf8
