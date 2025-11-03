package infrastructure

import (
	"context"
	"log"
	"os"
	"time"

	appErr "pond-io-server/pkg/errors"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

var MongoClient *mongo.Client 
var DB *mongo.Database

func newMongoClient(uri string) (*mongo.Client, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	clientOptions := options.Client().ApplyURI(uri)

	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		return nil, appErr.NewInternal("Failed to connect to MongoDB", err)
	}

	if err = client.Ping(ctx, readpref.Primary()); err != nil {
		_ = client.Disconnect(context.Background()) // Cleanup
		return nil, appErr.NewInternal("Failed to ping MongoDB connection", err)
	}

	log.Println("✅ Connected to MongoDB successfully!")
	return client, nil
}

func ConnectDB() {
	mongoURI := os.Getenv("MONGODB_URL")
	if mongoURI == "" {
		log.Fatal("MONGODB_URL environment variable is not set.")
	}

	client, err := newMongoClient(mongoURI)
	if err != nil {
		log.Fatalf("Failed to initialize MongoDB client: %v", err)
	}

	MongoClient = client 
}


func DisconnectMongo() {
	if MongoClient != nil {
		if err := MongoClient.Disconnect(context.Background()); err != nil {
			log.Printf("Error disconnecting MongoDB: %v", err)
		} else {
			log.Println("🔌 MongoDB connection closed.")
		}
	}
}
