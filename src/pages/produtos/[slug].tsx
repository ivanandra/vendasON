import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import styles from './produto.module.scss';
import Image from 'next/image';
import Link from "next/link";

export default function Produtos(props) {
    const router = useRouter();
   console.log(router.query.props);
    return (
        <div className={styles.productSection}>

            <h1>{router.locale}</h1>
            

            <a className={styles.aClass}href="/">
                <h4 style={{backgroundColor: props.produtos.color, textTransform: 'uppercase', fontSize: '1rem'}} className={styles.Botao}> Voltar Para Home</h4>
            </a>
            <div className={styles.productImage}>          
                <Image className={styles.mainImageProducts} width={1440} height={400} objectFit="cover" src={props.produtos.thumbnail}/>                         
            </div>
            <h2 style={{color: props.produtos.color}}>{props.produtos.nome_produto}</h2>
            <div className={styles.productTexts}>
                
                <p className={styles.productSeparetedText}>{props.produtos.descricaoPagina}</p>
                <Image className={styles.productImages} width={300} height={300} objectFit="cover" src={props.produtos.thumbnail}/>   
            </div>
            <h2 style={{color: props.produtos.color}}>COMO SERVIR SEU {props.produtos.nome_produto}</h2>
            <div className={styles.productTextsReverseColumn}>
                <Image className={styles.productImages} width={300} height={300} objectFit="cover" src={props.produtos.thumbnail}/> 
                <p className={styles.productSeparetedText}>{props.produtos.descricaoComoServir}</p>       
                       
            </div>
        </div>    
        );
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async (ctx) => {

    const {slug} = ctx.params;
    const response = await fetch(`http://localhost:3333/produtos/${slug}`)
    const data = await response.json()  

    return {
        props: {
            produtos: data,
            revalidate: 60 * 60 * 8 // 8 hours
        },
        revalidate: 60 * 60 * 8 //8 hours
    }
    
}