import Head from 'next/head'
// Forma de importar en React:
//  import Smth from 'path'   -> Importa la función default y le da nombre smth
//  import {smth} from 'path' -> Importa una función que no es default o un atributo
import Layout, { siteTitle } from '../components/layout'
import { getSortedPostsData } from '../lib/posts'

// Funciones async obligan al pre-procesamiento de las páginas a esperar a 
// que ocurra algo en concreto, como un fetch de la BBDD o un procesamiento
// de archivos
export async function getStaticProps() {
  const allPostsData = getSortedPostsData()

  return {
    props: {allPostsData}
  }
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    </Layout>
  )
}
