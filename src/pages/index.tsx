import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import styles from './home.module.scss';
import Link from 'next/link';
import { post } from "jquery";
import { useRef, useState } from "react";
import { useRouter } from "next/router";

type Product = {
    
    id: string,
    nome_produto: string,
    descricao: string,
    color: string,
    galeria: Galeria[],
    thumbnail: string,
    valor: string,
    descricaoPagina: string,
    descricaoComoServir: string
    
}

type Galeria = {
 
   src: string,
   alt: string,
   title: string
}

type ProductHome = 
{
    latestProducts: Product[];
   // allProducts: Product[];
    splitProducts: Product[];
    doubleProducts: Product[];
}


export default function Home({latestProducts, splitProducts, doubleProducts}: ProductHome) {

    const router = useRouter();
    const pegaInput = useRef(null);
    const [resultadoPedido, setResultadoPedido] = useState('');

    const pegaValorResultadoPedido = (ev) => {
        
        setResultadoPedido(resultadoPedido + "" + ev.target.value);
 
    }
        
    return (
          <div>
            <section className={styles.productsContainer}>               
                    <h4 className={styles.botaoTrouxa}>Selecione a Quantidade e Clique em "Enviar Pedido"</h4>  
                    <h4 style={{marginTop: '2rem', textTransform: 'uppercase', fontFamily: 'Indie Flower, cursive'}}>Mais Vendidos</h4>    

                    <span>{resultadoPedido}</span>
                    <span>{router.query.key}</span>

                <div className={styles.productsLast}>
                    {latestProducts.map(product => {
                    return(
                    <div className={styles.productsNames} key={product.id}>
                            <Image className={styles.imageDestaque} 
                            width={300} 
                            height={300} 
                            objectFit="cover" 
                            src={product.thumbnail}/>
                        <div className={styles.DescInput}>    
                            <div className={styles.Descricoes}>    
                                <h2>{product.nome_produto}</h2>
                                <strong>{product.valor}</strong>    
                                <p>{product.descricao}</p>
                            </div>    
                            <div className={styles.btnInput}>
                                <input type="number" placeholder="Selecione a Quantidade" className={styles.InputStyle}></input>  
                                <Link href={`/produtos/${product.id}`}>
                                    <button className={styles.btnSaibaMais}type="button">Saiba Mais</button>
                                </Link>    
                            </div>  
                        </div>                 
                    </div>  
                    ) 
                })}
                </div>
            </section>    
            <section className={styles.productsContainer}>
                <Link href="#">
                    <h4 className={styles.botaoTrouxaEnviar}>Enviar Pedido</h4> 
                </Link>
                    <h4 style={{marginTop: '2rem', textTransform: 'uppercase', fontFamily: 'Indie Flower, cursive'}}>Produto 100% Artesanal</h4>
               <div className={styles.ContainerFotos} onBlur={pegaValorResultadoPedido}>
                {splitProducts.map(produt => {
                    return(
                        <div className={styles.prodCards} key={produt.id}>
                           <Image className={styles.imageProd}
                                width={250}
                                height={250}
                                objectFit="cover" 
                                src={produt.thumbnail}
                            />
                            <div className={styles.containerDescricoesProdutos}>
                                <div className={styles.Descricoes}>    
                                    <h2>{produt.nome_produto}</h2>
                                    <strong>{produt.valor}</strong>    
                                    <p>{produt.descricao}</p>
                                </div> 
                            
                                <div className={styles.btnInput}>
                                    <input type="number" 
                                    placeholder="Selecione a Quantidade" 
                                    className={styles.InputStyle}
                                    id={produt.nome_produto}
                                    ref={pegaInput}                      
                                    ></input>       
                                </div>               
                                <Link href={`/produtos/${produt.id}`}>
                                    <button className={styles.btnSaibaMais}type="button">Saiba Mais</button>
                                </Link>
                            </div>
                        </div>
                    )
                })}
                </div>
                <div className={styles.ContainerFotos}>

                {doubleProducts.map(produti => {
                    return(
                        <div className={styles.prodCards}>
                            <Image className={styles.imageProd}
                                width={250}
                                height={250}
                                objectFit="cover" 
                                src={produti.thumbnail}
                            />
                            <div className={styles.Descricoes}>    
                                <h2>{produti.nome_produto}</h2>
                                <strong>{produti.valor}</strong>    
                                <p>{produti.descricao}</p>
                            </div> 
                        
                            <div className={styles.btnInput}>
                                <input type="number" placeholder="Selecione a quantidade" className={styles.InputStyle}></input>       
                            </div>               
                            <Link href={`/produtos/${produti.id}`}>
                                <button className={styles.btnSaibaMais}type="button">Saiba Mais</button>
                            </Link>
                        </div>
                    )
                })}
                </div>
            </section>
          </div>
      );
}
export const getStaticProps: GetStaticProps = async () => {
    const response = await fetch('http://localhost:3333/produtos')
    const data = await response.json()  

    const produtos = data.map(produto => {
        return{
            id: produto.id,
            nome_produto: produto.nome_produto,
            descricao: produto.descricao,
            color: produto.color,
            galeria: produto.galeria,
            thumbnail: produto.thumbnail,
            valor: produto.valor,
            descricaoPagina: produto.descricaoPagina,
            descricaoComoServir: produto.descricaoComoServir
        };
    })

    const latestProducts = produtos.slice(0,2);
    //const allProducts = produtos.slice(2, produtos.lenght);
    const splitProducts = produtos.slice(2,5);
    const doubleProducts = produtos.slice(5,produtos.lenght);
   
   /* const galeria = data.map(galeria => {
        return {
            src: galeria.src,
            alt: galeria.alt,
            title: galeria.title
        };
    })*/

    return {
        props: {
            latestProducts,
            //allProducts,
            splitProducts,
            doubleProducts
                    
        },
        revalidate: 60 * 60 * 8 //8hours
    }
}
