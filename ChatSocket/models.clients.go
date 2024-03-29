package main

import (
	"github.com/gorilla/websocket"
)

type ClientManager struct {
	clients    map[*Client]bool
	broadcast  chan []byte
	register   chan *Client
	unregister chan *Client
}

type Client struct {
	id     string
	socket *websocket.Conn
	send   chan []byte
}

type Message struct {
	Sender    string `json: "sender,omitempty"`
	Recipient string `json: "recipient,omitempty"`
	Content   string `json: "content,omitempty"`
}
