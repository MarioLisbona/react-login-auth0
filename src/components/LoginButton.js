import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  async function embeddedLogin() {
    try {
      const response = await fetch(
        "https://dev-fptiqhag41j3zo1q.au.auth0.com/passwordless/start",
        {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: {
            client_id: "X0EXNQ7st47i39RNyUNGWAUmXNq8aN33",
            client_secret:
              "iJ6ksnI37OXZKKxvTSi4A1wma3nIsLFyEGGdc3vaAY0r8O5-JQ3so9s2A_F-5id6",
            connection: "email",
            email: "mario.lisbona@gmail.com",
            send: "link",
            authParams: {
              scope: "openid",
            },
          },
        }
      );

      const result = await response.json();
      console.log("Success", result);
    } catch (error) {
      console.log("Error", error);
    }
  }

  return (
    !isAuthenticated && <button onClick={() => embeddedLogin()}>Sign In</button>
  );
};

export default LoginButton;
