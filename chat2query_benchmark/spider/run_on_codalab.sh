#!/bin/bash
set -e
set -x
export BASE_URL="https://data.tidbcloud.com/api/v1beta/app/chat2query-QMczxawY/endpoint"
python3 /app/parse_cases.py --debug --json_file=./spider/spider/test_data/dev.json --output predict.txt
