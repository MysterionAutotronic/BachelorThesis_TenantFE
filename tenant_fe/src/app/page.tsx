'use client';

import { useConfig } from '@/lib/ConfigProvider';
import styles from './page.module.css';

export default function Home() {
    const cfg = useConfig();

    let loc: Intl.Locale | undefined = undefined;
    if(cfg.address?.country) {
        loc = new Intl.Locale(cfg.address.country);
    }

    function countryName(): string | null {
        if (!loc) return null;
        const countryEn = new Intl.DisplayNames([loc.language], { type: 'region'});
        const res = countryEn.of(loc.region!);
        if (!res) return null;
        return res;
    }

    return(
        <main>
            <div className={styles.center}>
                <h1 className={styles.companyName}>{cfg.companyName}</h1>
                <p>{cfg.proposition}</p>
            </div>
                {
                    cfg.products ?
                        <div className={styles.productsDiv}>
                            <h2>Products</h2>
                            <ul>
                                {cfg.products.map(p => <li key={p}>{p}</li>)}
                            </ul>
                        </div>
                    :
                        null
                }
            <div className={styles.addressDiv}>
                <h2 className={styles.addressHeader}>Address</h2>
                <address>
                    {cfg.address?.street} {cfg.address?.streetNumber} <br/>
                    {cfg.address?.zipCode} {cfg.address?.city} <br/>
                    {countryName()}
                </address>
            </div>
            <div className={styles.aboutDiv}>
                <h2 className={styles.aboutHeader}>About us</h2>
                <p>{cfg.about}</p>
            </div>
            <footer>
                <button className='crash' onClick={() => {
                    fetch(`/crash`)
                        .then(() => {alert("Crash triggered")})
                        .catch(() => alert("Backend not reachable"))
                }}>
                    Crash
                </button>
            </footer>
        </main>
    )
}