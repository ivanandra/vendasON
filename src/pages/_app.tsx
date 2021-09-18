import {Header} from '../components/Header/index';

import '../styles/globals.scss';

import styles from '../styles/app.module.scss';

import {Footer} from '../components/Footer';

function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.mainContent}>
      <Header/>
      <main>
        <Component {...pageProps}/>
      </main>    
        <Footer/>        
    </div>
    
  );
}

export default MyApp
