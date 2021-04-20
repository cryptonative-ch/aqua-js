#!/bin/bash

Cyan='\033[0;36m'
NC='\033[0m' # No Color

# Find all artifacts
ARTIFACT_PATHS=($(ls -1 artifacts/*.json))

# Create abis directory if missing
mkdir -p abis

# Extract artifacts
printf "Extracting ABIs\r\n\r\n"

for i in ${!ARTIFACT_PATHS[@]};
do

  # source
  artifactSourcePath=${ARTIFACT_PATHS[$i]}
  artifactName=($(jq -r '.contractName' $artifactSourcePath))
  artifactABIPath="abis/${artifactName}.json"

  # Extract the ABIs from the ABI
  printf "Extracting ${Cyan}${artifactName}${NC} ABIs to ${Cyan}${artifactABIPath} ${NC}\r\n";
  jq '.abi' $artifactSourcePath > $artifactABIPath;

done
