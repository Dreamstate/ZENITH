package http

import (
	"context"
	"fmt"
	"net/http"
	"os"

	"zenith/backend/tools/pkce"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/microsoft"
)

var _ = godotenv.Load()

//nolint:gochecknoglobals
var (
	clientID     = os.Getenv("MSC_CLIENT_ID")
	clientSecret = os.Getenv("MSC_CLIENT_SECRET")
	redirectURL  = "https://27cb-85-196-176-77.ngrok-free.app/auth/callback"

	oauthConfig = &oauth2.Config{
		ClientID:     clientID,
		ClientSecret: clientSecret,
		RedirectURL:  redirectURL,
		Endpoint:     microsoft.AzureADEndpoint(os.Getenv("MSC_TENANT_ID")),
		Scopes:       []string{"openid", "profile", "email"},
	}

	codeVerifierMap = make(map[string]string)
)

func Start() error {
	r := gin.Default()
	r.GET("/api/auth/microsoft", loginHandler)
	r.GET("/api/auth/callback", callbackHandler)
	err := r.Run(":8080")
	return err
}

func loginHandler(c *gin.Context) {
	verifier := pkce.GenerateCodeVerifier()

	codeChallenge := pkce.GenerateCodeChallenge(verifier)

	// Save the code verifier in memory for use in callback (associate with state for production)
	state := "state" // Use a random value in production for CSRF protection
	codeVerifierMap[state] = verifier

	url := oauthConfig.AuthCodeURL(
		state, oauth2.AccessTypeOffline, oauth2.SetAuthURLParam("code_challenge", codeChallenge),
		oauth2.SetAuthURLParam("code_challenge_method", "S256"))
	c.Redirect(http.StatusFound, url)
}

func callbackHandler(c *gin.Context) {
	state := c.Query("state")
	code := c.Query("code")

	if state == "" || code == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing state or code parameter"})
		return
	}

	codeVerifier, ok := codeVerifierMap[state]
	if !ok {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid state"})
		return
	}

	token, err := oauthConfig.Exchange(context.Background(), code, oauth2.SetAuthURLParam("code_verifier", codeVerifier))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to exchange token: %v", err)})
		return
	}

	// TODO: save token in cookie or db?
	c.JSON(http.StatusOK, gin.H{
		"token": token.AccessToken,
	})
}
