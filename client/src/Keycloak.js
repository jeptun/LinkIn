import Keycloak from "keycloak-js";
const keycloak = new Keycloak({
 url: "http://localhost:3000/auth",
 realm: "Keycloak-react-auth",
 clientId: "React-auth",
});

export default keycloak;