import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const [userEmail, setUserEmail] = useState();

  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_AUTH0_CLIENT_SECRET;

  const data = {
    client_id: clientId,
    client_secret: clientSecret,
    connection: "email",
    email: userEmail,
    send: "link",
    authParams: {
      scope: "openid",
    },
  };

  async function embeddedLogin(data) {
    try {
      const response = await fetch(`https://${domain}/passwordless/start`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Success", result);
    } catch (error) {
      console.log("Error", error);
    }
  }

  return (
    <>
      {!isAuthenticated && (
        <>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={userEmail}
            onChange={(evt) => setUserEmail(evt.target.value)}
          ></input>
          <button onClick={() => embeddedLogin(data)}>Sign In</button>
        </>
      )}
    </>
  );
};

export default LoginButton;
