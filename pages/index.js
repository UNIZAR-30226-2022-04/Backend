import Head from 'next/head'
// Forma de importar en React:
//  import Smth from 'path'   -> Importa la función default y le da nombre smth
//  import {smth} from 'path' -> Importa una función que no es default o un atributo
import Layout, { siteTitle } from '../components/layout'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'

import Comentario from '../components/comentario'

import utilStyles from '../styles/utils.module.css'

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
      <Head>
        <title>{siteTitle}</title>
      </Head>
      
      <section className={utilStyles.headingMd}>
        <p>El puto amo, no hay nada más que decir mi señoría</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href='https://nextjs.org/learn'>our Next.js tutorial</a> 
          ).
        </p>
        <Comentario>
          Todo lo que escribas aqui no aparecerá en la web.
          Si se quiere hacer una redirección a una url que no esté en esta página web,
          no se puede usar <Link />, hay usar solo <a />. Para otras situaciones usar <Link />
        </Comentario>
      </section>
      
      
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
            {allPostsData.map(({ id, date, title }) => (
              <li className={utilStyles.listItem} key={id}>
                <Comentario>
                  Usando <Link href='x'> <a> </a> </Link> podemos redireccionar a otras páginas
                  de nuestra web de forma cuasi instantánea. Link es de Next
                </Comentario>
                <Link href={`/posts/${id}`}>
                  <a>{title}</a>
                </Link>
                <br />
                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small>
              </li>
            ))}
        </ul>
      </section>

    </Layout>
  )
}
