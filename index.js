import Head from "next/head";
// Forma de importar en React:
//  import Smth from 'path'   -> Importa la función default y le da nombre smth
//  import {smth} from 'path' -> Importa una función que no es default o un atributo
import Layout, { siteTitle } from "../components/layout";
import { getSortedPostsData } from "../lib/posts";

// Funciones async obligan al pre-procesamiento de las páginas a esperar a
// que ocurra algo en concreto, como un fetch de la BBDD o un procesamiento
// de archivos
export async function getStaticProps() {
	const allPostsData = getSortedPostsData();

	return {
		props: { allPostsData },
	};
}

export default function Home({ allPostsData }) {
	return <Layout home></Layout>;
}
