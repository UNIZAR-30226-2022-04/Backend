import Head from 'next/head'
import Image from 'next/image'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import Comentario from './comentario'

const name = 'Frankenstory'
// Con el atributo export se puede importar desde otros sitios 
export const siteTitle = 'Frankenstory'

// children es lo que se introduce entre los <> y home una variable 
export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Comentario>
          Se usa la cabecera Head de next en vez head de html5, ya que se 
          puede modificar facilmente con Document (de next) y es más optima 
      </Comentario>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <Comentario>
          los meta-atributos no se para que sirven en nuestra situación 
        </Comentario>
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <header className={styles.header}>
        {home ? ( // Estamos en home
          <>
            <Comentario>
              Al usar Image (de next) en vez img (de html5), automáticamente se encuadra
              a la pantalla
              Mirar la documentación de todas estas cabeceras para saber que 
              atributos se les puede pasar
            </Comentario>
            <Image
              priority
              src="/images/logo.png"
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt={name}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : ( // Estamos fuera del home
          <>
            <Link href="/">
              <a>
                <Image
                  priority
                  src="/images/logo.png"
                  className={utilStyles.borderCircle}
                  height={108}
                  width={108}
                  alt={name}
                />
              </a>
            </Link>

            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.colorInherit}>El Cumpleñero</a>
              </Link>
            </h2>
          </>
        )}
      </header>

      <Comentario>
        Con children introducimos cualquier cosa que nos pasen entre <Layout />
        Se le pueden aplicar estilos comunes de forma muy sencilla con className
      </Comentario>
      <main>{children}</main>

      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  )
}
