package main

import (
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"io/ioutil"
	"math/rand"
	"net/http"
	"time"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// Parse JSON body
		body, err := ioutil.ReadAll(r.Body)
		if err != nil {
			http.Error(w, "Error reading request body", http.StatusBadRequest)
			return
		}

		// Perform hashing
		hash := sha256.New()
		hash.Write(append(body, []byte(fmt.Sprintf("%d", rand.Intn(int(time.Now().UnixNano()))))...))
		hashInBytes := hash.Sum(nil)
		hashString := hex.EncodeToString(hashInBytes)
		fmt.Println(hashString)

		// Send response
		w.Header().Set("Content-Type", "text/plain")
		w.Write([]byte(hashString))
	})

	addr := "localhost:3000"
	fmt.Printf("🦊 Go is running at http://%s\n", addr)

	// Start the server
	if err := http.ListenAndServe(addr, nil); err != nil {
		fmt.Printf("Error: %s\n", err)
	}
}
