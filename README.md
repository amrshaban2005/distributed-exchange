# boot two grape servers

```
grape --dp 20001 --aph 30001 --bn '127.0.0.1:20002'
grape --dp 20002 --aph 40001 --bn '127.0.0.1:20001'
```

# run server

./server

`npm run start`

# run client1

./client1

`npm run start`

# send requests

./client1/rest.http

# Note

send buy and sell requests from client1, it will be distributed to server and matched
for example if send buy request from client1 and send sell request from client2(same like client1) , order will be matched at the server

- While I understand that this might not fully align with the task requirements, I've attempted to simplify and convey the main concept
