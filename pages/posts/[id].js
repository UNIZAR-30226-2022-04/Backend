import Layout from '../../components/layout'
import Head from 'next/head'
import Date from '../../components/date'
import { getAllPostIds, getPostData } from '../../lib/posts'

import utilStyles from '../../styles/utils.module.css'

export default function Post({postData}) {
  return (
    <Layout>
        <Head>
            <title>{postData.title}</title>
        </Head>

        <article>
            <h1 className={utilStyles.headingXl}>{postData.title}</h1>
            <div className={utilStyles.lightText}>
                <Date dateString={postData.date} />
            </div>
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>

    </Layout>
  )
}

// La función getStaticPaths() devuelve todos los posibles paths que una página
// dinámica [smth].js puede tener
// Se llama automática antes de preprocesar una página y sirve para saber si un
// path de una página dinámica es válido o no
export async function getStaticPaths() {
    const paths = getAllPostIds()
    return {
        paths,
        fallback: false
    }
}

// La función getStaticProps() se llama antes del preprocesamiento y permite recoger
// datos de APIs (por ejemplo)
// Hay otra llamada getServerSideProps() que permite recuperar info de forma constante
// que cambia muchas veces, ya que StaticProps solo se llama cada vez que el cliente
// cambia de página
//
// Mirar https://nextjs.org/docs/api-reference/data-fetching/get-static-props
// y https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props
//
// Solo se ejecuta en el servidor, por lo que se pueden poner contraseñas de la
// BBDD, las cuales nunca las verá el cliente
export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id) // id es el nombre del .js dento de []
    return {
        props: { postData }
    }
}
  