watch:
	dotnet watch run --pathbase=/MangedDoom-Blazor
start:
	dotnet run --pathbase=/MangedDoom-Blazor
start_release:
	dotnet run --pathbase=/MangedDoom-Blazor -c Release
watch_release:
	dotnet watch run --pathbase=/MangedDoom-Blazor -c Release
restore:
	dotnet restore 
publish:
	dotnet publish -c Release