import format from 'date-fns/format';
import pt_BR from 'date-fns/locale/pt-BR';
import Image from 'next/image';


import styles from './styles.module.scss';

export function Header() {

    const currentDate = format(new Date(),'EEEEEE, d, MMMM', {

        locale: pt_BR
    });

    return (
        <header className={styles.headerContainer}>
            <Image className={styles.logo}width={70} height={70} src='/images/logoyellow.jpg' alt='Otário'/>
            <h4>Faça seu Pedido On-Line</h4>
            <span>{currentDate}</span>
        </header>
    ); 
}