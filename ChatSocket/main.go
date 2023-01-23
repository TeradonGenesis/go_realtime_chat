package main

import (
	"fmt"
	"net/http"
)

var manager = ClientManager{
	make(map[*Client]bool),
	make(chan []byte),
	make(chan *Client),
	make(chan *Client),
}

func main() {
	fmt.Println("Starting application")
	go manager.start()
	http.HandleFunc("/ws", wsPage)
	http.ListenAndServe(":12345", nil)
}
