#!/bin/bash

PORT=8080

# Find and kill the process using the specified port
PID=$(lsof -ti :$PORT)
if [ -n "$PID" ]; then
  echo "Stopping process on port $PORT (PID: $PID)"
  kill $PID
else
  echo "No process found on port $PORT"
fi

