// _app.js es la única que puede importar globals.css
import "../styles/global.css";

// Todas las página pasan por aquí
// Se pueden definir cosas que van a estar en todas las páginas
const MyApp = ({ Component, pageProps }) => {
	return <Component {...pageProps} />;
};

export default MyApp;
