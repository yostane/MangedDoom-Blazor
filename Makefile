watch:
	dotnet watch run
start:
	dotnet run
start_release:
	dotnet run -c Release
watch_release:
	dotnet watch run -c Release
restore:
	dotnet restore 
publish:
	dotnet publish -c Release
custom_profile:
    dotnet run -c Release --launch-profile "BlazorDoom"  --verbosity normal