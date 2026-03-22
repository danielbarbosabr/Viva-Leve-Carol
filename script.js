// Lista de produtos com opções de meses
const products = [
    // SECAPS - Todos no início como solicitado
    { 
        name: "Secaps Black", 
        basePrice: 197,
        img: "https://api.hest.com.br/products/20260203113215423.jpeg", 
        desc: "Tratamento emagrecedor que age na raiz do problema.",
        options: [
            { months: 1, price: 209, link: "https://pay.hest.com.br/a93c2b8d-b73a-4076-ba69-b96d6bfc26a1" },
            { months: 3, price: 335, link: "https://pay.hest.com.br/b9837c8b-2ba5-49f3-ad7e-6d036bff1b96" },
            { months: 5, price: 461, link: "https://pay.hest.com.br/7a787852-b3c9-4a9f-a58f-6d571462e4fe" }
        ],
        details: [
            { type: 'image', src: 'https://scontent.fcpq14-1.fna.fbcdn.net/v/t39.30808-6/641388317_122110164249224900_2559633456177760796_n.webp?stp=dst-jpg_tt6&_nc_cat=110&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeFjhBHJV30_nAfT8PsQD_2DvL44xFKJpPS8vjjEUomk9CRRmQV32fE-WwyXXWUErvbaoY2GDK_2VV79vaFalx6L&_nc_ohc=z-XScaDZGDwQ7kNvwGvw6OT&_nc_oc=AdrxeyEAQTO172k6855-LQn41RkbK1_dnCTHSYZXrG17WgOSxyP3CecMEq-9KNv6b3N2HJmgqMaC5RSGM3Qfejww&_nc_zt=23&_nc_ht=scontent.fcpq14-1.fna&_nc_gid=dakLt4vukcFs4S9e2JGB2g&_nc_ss=7a30f&oh=00_Afxk1iu5HWcyXYr5UF0z6dnlc2vcuGQUm25D0bya2cYG6w&oe=69C47696' }
        ]
    },
    { 
        name: "Secaps Black Chá", 
        basePrice: 209.9,
        img: "https://api.hest.com.br/products/20260114195505729.jpg", 
        desc: "Chá solúvel com cúrcuma e psyllium. Energia e saciedade.",
        options: [
            { months: 1, price: 209.90, link: "https://pay.hest.com.br/4c1c5ddf-6f67-4c82-9950-d2e3b6b9ba0c" },
            { months: 3, price: 335, link: "https://pay.hest.com.br/10cfe014-dec3-42b4-955e-ce04eb0663b2" },
            { months: 5, price: 461.50, link: "https://pay.hest.com.br/6ed08fe0-1da6-47a5-ab7d-c2df32a0aa44" }
        ],
        details: [
            { type: 'image', src: 'https://scontent.fcpq14-1.fna.fbcdn.net/v/t39.30808-6/652612647_122113112967224900_2552435891511405490_n.jpg?stp=dst-jpg_s590x590_tt6&_nc_cat=107&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeH4LZqYRYu2x4Im_PylXqYCVCOgUSfMlVRUI6BRJ8yVVBSPTKFfpmfikbTaSzLPHtGaRXaIDDNgDxs2Gwx5LWMD&_nc_ohc=gUIGXJ4ZhWYQ7kNvwGSXRqA&_nc_oc=AdqR6Zw3rTiBXnPF5ICx0Ck5yWqr61fu_iNmcgbG5szSMiqDAlsK8zWcNpHiGJYOmaCUYcK_GBmAqVRqO3PNU-fA&_nc_zt=23&_nc_ht=scontent.fcpq14-1.fna&_nc_gid=HGdnSCP9-UQ-Bmk_oz28Dg&_nc_ss=7a32e&oh=00_AfzdxhIUS8T6u68qji1xGWQxnZpdfPEWB2LriVsD5epGEw&oe=69C46DA2' },
            { type: 'html', content: '<iframe src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1486733326405141%2F&show_text=false&width=267&t=0" width="267" height="476" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen="true"></iframe>' }
        ]
    },
    { 
        name: "Secaps Max", 
        basePrice: 197,
        img: "https://api.hest.com.br/products/20250128152337073.png", 
        desc: "Emagrecedor que já transformou mais de 35 mil pessoas.",
        options: [
            { months: 1, price: 209.90, link: "https://pay.hest.com.br/1a54aeb5-46bb-4355-9fcc-547dc972a4b9" },
            { months: 3, price: 335, link: "https://pay.hest.com.br/a13d1c3c-3d35-4871-aeba-6d2a93d69b7b" },
            { months: 12, price: 859, link: "https://pay.hest.com.br/9071a692-b08b-4142-bf3a-0e11b33b3548" }
        ],
        details: [
            { type: 'image', src: 'https://scontent.fcpq14-1.fna.fbcdn.net/v/t39.30808-6/645149433_122110773051224900_9019391559536306528_n.webp?stp=dst-jpg_tt6&_nc_cat=110&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeEaSxtwTiHcpW_wp0k3_HPu293ZSKXpa8fb3dlIpelrx0lWuanMgVgIOh4oIOcIt0MyXf_3QLBWC0kkwbPcYCiL&_nc_ohc=kF8Oj4OGr68Q7kNvwHgDxXo&_nc_oc=AdpzjCRbRUCAHx1pMww1p2mkFX6dxF7mdliui4PT0k2c1BaBrCdUR-HFljjiIw8ywiLJ57r9hAK2e8fo4evvGiom&_nc_zt=23&_nc_ht=scontent.fcpq14-1.fna&_nc_gid=oVy-LkDjPgH6KBP5dMjxWg&_nc_ss=7a30f&oh=00_Afwf6iFwLXdYQY5YSRlHVdiCgR-pIm0bU_O3MLWapTgZ2Q&oe=69C48638' },
            { type: 'image', src: 'https://scontent.fbau3-2.fna.fbcdn.net/v/t39.30808-6/487316863_8773177199448310_7472235821140101242_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=2a1932&_nc_eui2=AeF8soeG9ezdsEHftaRs4fELuzLlYxQ9BMC7MuVjFD0EwPrMEZ8KQXEFH7aJfbz--Hkoza8XZZrCpjqumBHvn8rq&_nc_ohc=TpEb75jvg7EQ7kNvwERzChg&_nc_oc=AdpMoNjgHWzX9d1ekYXDMykqNZSLKrQq4ytfmqJBjm-CUjZenWBYk_Jeat-YNkhPeIbeldOjdf5QolID_4leYD_Q&_nc_zt=23&_nc_ht=scontent.fbau3-2.fna&_nc_gid=2qH7XhqWzcqmiyz7hTju4Q&_nc_ss=7a32e&oh=00_AfwGQbc85EoOHKp-9cDa0_Wk2ftEr3AYrDfjraYk0BqyvA&oe=69C61018' }
        ]
    },
    
    // DEMAIS PRODUTOS (ordenados alfabeticamente)
    { 
        name: "Calminol", 
        basePrice: 197,
        img: "https://api.hest.com.br/products/20251112155222288.png", 
        desc: "Gel creme com óleo de copaíba, cânfora e mentol. Alívio de tensões musculares.",
        options: [
            { months: 1, price: 197, link: "https://pay.hest.com.br/cc320fe0-5edf-4a52-b80c-144b5008a7d4" },
            { months: 5, price: 397, link: "https://pay.hest.com.br/cb3dd576-9d03-418d-b22b-782cd8f96123" },
            { months: 12, price: 697, link: "https://pay.hest.com.br/5886005c-9689-4e5f-b065-bffe7ee5dfb9" }
        ],
        details: [
            { type: 'image', src: 'https://scontent.fbau3-1.fna.fbcdn.net/v/t39.30808-6/649684088_122113367433225431_344453539657892486_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeGNsRNirkheCIJ1j-VOAxQL9-E3RN3ml1n34TdE3eaXWYvf7qRzewbDugoa1rmM_1ANvLAQTHXu-7GFiAgKvD1h&_nc_ohc=FdB8HvlFzcQQ7kNvwH2zjYc&_nc_oc=Adq3GaNE7-TPcHIoMrA3OXP9Lvy8IhCGEurLG2Wq6qBpwHT4-FwterrYeJ6lKwidYKxUfJucuHjMp7fqWUnpDnr9&_nc_zt=23&_nc_ht=scontent.fbau3-1.fna&_nc_gid=S3VegKVHXjbynI-RYtZplw&_nc_ss=7a32e&oh=00_AfzY9azWWt7bq8nPQCT6SnpTJCumgZmvKAlvstwn69dsmw&oe=69C5F029' },
            { type: 'image', src: 'https://scontent.fbau3-1.fna.fbcdn.net/v/t39.30808-6/641101099_122110259679225431_3638175519730421397_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeEL953rzwN166AYTg46L8GkYUH9Hx6BCTlhQf0fHoEJOe_irfR9ojF_ZbmVLcZa6nO5h4HtqyFJJlauUsMBLr0x&_nc_ohc=1I6nWrIK864Q7kNvwH1tRXQ&_nc_oc=AdoAjBws2msJGybY0hiXj2hiJIyekgzApkDASBvFy3HDBIuhoG4QSNTANQQlLTKUrTIonAA5WPEj8dY1lK0KEYKB&_nc_zt=23&_nc_ht=scontent.fbau3-1.fna&_nc_gid=kdTWWCszMxfvZ9lh2hjaag&_nc_ss=7a32e&oh=00_Afw_D5EGdbgoB1ZX8ITIU42LceemnvSQgpXTrei-SWeNPQ&oe=69C61006' },
            { type: 'image', src: 'https://scontent.fbau3-2.fna.fbcdn.net/v/t39.30808-6/634798092_122109459441225431_1452345213182997204_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeEgUek18fhEsmS8k1bPP1XyDtb80M2kay4O1vzQzaRrLsUxi5oYEGuClcnYNWd3w5EsFNBI0VwWrEjhggHQVrdE&_nc_ohc=Vg7yThF-ppwQ7kNvwHmAtOO&_nc_oc=AdqXpGL-_Ni35g91DcReZIsK8xi3GKlduOuzbgPW2oKNAMNZ2EfRVWshyW1l2o9zoxfLymEcYSS7jGCEo7oCPED7&_nc_zt=23&_nc_ht=scontent.fbau3-2.fna&_nc_gid=SoXiiMd9o9t_fPfjLvBXHg&_nc_ss=7a32e&oh=00_Afx6LTTH0oIYuOtnfJee6d6YTq0K61EJC3sckuwXOVFegA&oe=69C6036E' }
        ]
    },
    { 
        name: "Celuglow", 
        basePrice: 209,
        img: "https://api.hest.com.br/products/20251112155457911.png", 
        desc: "Creme anticelulite com Nano Q10, reduz celulite e melhora firmeza da pele.",
        options: [
            { months: 1, price: 209.90, link: "https://pay.hest.com.br/3dc99862-26fb-476a-89df-fae83e545cbd" },
            { months: 5, price: 461.50, link: "https://pay.hest.com.br/17dce879-b598-4a41-8c03-45e47a16057e" },
            { months: 12, price: 851, link: "https://pay.hest.com.br/bd6c50b9-99c6-44d5-9c19-1154995b7a3c" }
        ]
    },
    { 
        name: "Clarize", 
        basePrice: 209,
        img: "https://api.hest.com.br/products/20251112182138809.png", 
        desc: "Clareador íntimo com niacinamida e ácido hialurônico. Uniformiza o tom da pele.",
        options: [
            { months: 1, price: 209, link: "https://pay.hest.com.br/baf4666f-6ce9-4da8-a2ac-755c8d3e4d64" },
            { months: 3, price: 335, link: "https://pay.hest.com.br/1cf57f4a-688d-45d0-a3ca-8de9a2ca5e49" },
            { months: 5, price: 461, link: "https://pay.hest.com.br/527119e2-5030-41f8-b0af-b14b0e98c78c" }
        ]
    },
    { 
        name: "CreaGym", 
        basePrice: 197,
        img: "https://api.hest.com.br/products/20251112173707676.png", 
        desc: "Creatina monohidratada, magnésio bisglicinato e coenzima Q10. Aumenta força, energia e desempenho físico.",
        options: [
            { months: 1, price: 209.90, link: "https://pay.hest.com.br/58d66193-b37f-4cc2-8fd3-59f68f1111fe" },
            { months: 3, price: 335, link: "https://pay.hest.com.br/58d66193-b37f-4cc2-8fd3-59f68f1111fe" },
            { months: 5, price: 461.50, link: "https://pay.hest.com.br/a2cb9260-b59d-40e3-bcb6-8d8e5fdb2383" }
        ],
        details: [
            { type: 'image', src: 'https://scontent.fbau3-2.fna.fbcdn.net/v/t51.82787-15/626286188_17855984883612516_2330671153457725029_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeFsMr4gLz93Tq0-KHZKJvZHwby8_dmMdwDBvLz92Yx3AAlmk9ySVmynGl6uA3cTLTsbFogm-5CSp3DeM1VoPJki&_nc_ohc=A6il-jHsVqEQ7kNvwFo46m4&_nc_oc=AdoLjzmPPlyB6UpE1N23S6tRYXg5RUNFiWQFz1DHP7odEmSUCJg-4j9x002qyWG-F939j0jbA9bBxBCCpmF5upq-&_nc_zt=23&_nc_ht=scontent.fbau3-2.fna&_nc_gid=0UGfm2WD5j0iSyz1dXxXQg&_nc_ss=7a32e&oh=00_Afz6BvhgBC6q6ytAQyX7YqTTEhn64EsJz-1cdR2uWd5xKw&oe=69C5EB75' },
            { type: 'image', src: 'https://scontent.fbau3-1.fna.fbcdn.net/v/t51.82787-15/626288062_17855984892612516_8566221061596054852_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeEmWCZaWxyyCUoWBN9UU0gTP2YSRHBKy90_ZhJEcErL3eMA_ULHCdMSBM3Fo21a49ouoC_sWEPY-uVenQ2IhO8R&_nc_ohc=Es-Til3Cx1YQ7kNvwE_d8Vz&_nc_oc=AdozWJ-besa2cbA0jvfuMnblrTtnmUJ5d32Pf8wPijnHsX6nWyWtXuVeyTZaiP1gZFe92Z9rk97hdWuAxR49D1Jz&_nc_zt=23&_nc_ht=scontent.fbau3-1.fna&_nc_gid=mFNF9A5Z1ysdIkB2IoSKHw&_nc_ss=7a32e&oh=00_AfzjYVLDJuUeEeVi-HQVTe3jNryxmSfrDtTjDz8rZWhQVA&oe=69C5F925' }
        ]
    },
    { 
        name: "Creatina Gummy", 
        basePrice: 197,
        img: "https://api.hest.com.br/products/20251112173350643.png", 
        desc: "Creatina em gomas sabor tutti-frutti. Aumenta força, resistência e performance nos treinos.",
        options: [
            { months: 1, price: 209.90, link: "https://pay.hest.com.br/4b43e130-4da6-4653-b0bf-07eda9728b7f" },
            { months: 3, price: 335, link: "https://pay.hest.com.br/714d7364-d132-4121-a6cb-101f5093e6d7" },
            { months: 5, price: 461.50, link: "https://pay.hest.com.br/f1032fdf-daac-4bc1-9bc2-397deb365f70" }
        ],
        details: [
            { type: 'image', src: 'https://scontent.fbau3-2.fna.fbcdn.net/v/t51.82787-15/642429088_17857794339612516_544781699236909530_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeHxFWnVVHDhPHTGxNc4wej-CBSvI9b3-iYIFK8j1vf6JlGqKTGbCsjermO5XOyvGqgys6YdrV7zNKqa1S24xE68&_nc_ohc=935bGylyryQQ7kNvwEC6Sof&_nc_oc=AdpPJZgg0dqDfWatnw3xMMLAHTZa39a8jy8CEqtYqeyp1h4HrFVw6cuiWYJwz4wwOxBmqBrZfznb3K4N-P3h9R_S&_nc_zt=23&_nc_ht=scontent.fbau3-2.fna&_nc_gid=SZSAgiI9ZX0qhdxEM_4q6w&_nc_ss=7a32e&oh=00_AfxzH3uIG-xzZtTIsCs8YYG2DKitXsVt8q-xGuB1z8lwnA&oe=69C5F016' }
        ]
    },
    { 
        name: "FiberSlim", 
        basePrice: 209,
        img: "https://api.hest.com.br/products/20251112180628477.png", 
        desc: "Suplemento de fibras sabor morango. Auxilia saciedade e funcionamento intestinal.",
        options: [
            { months: 1, price: 209.90, link: "https://pay.hest.com.br/d7e3d181-624f-42a4-a00b-e16836892e99" },
            { months: 5, price: 461.50, link: "https://pay.hest.com.br/956e8c7f-294f-486f-9313-abc90a29164d" },
            { months: 12, price: 859, link: "https://pay.hest.com.br/a4f761db-a482-4aa7-b45a-3af5473d76e7" }
        ],
        details: [
            { type: 'image', src: 'https://scontent.fbau3-2.fna.fbcdn.net/v/t51.82787-15/627164301_17855336016612516_8884616195499923807_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeEF4B8j6qfikZBso0qL-JGlevLQWYflTfx68tBZh-VN_DvnF8vwGRyHr2oRv81plMsP-5quZmCoHovH1JuIhogL&_nc_ohc=Nkyq3FuOdTAQ7kNvwGtchma&_nc_oc=AdqX73nYuhLBCUu7luZ20O6rRBI2zIjBo7NwcHQXaHwIkUJTCtpbTfhA1It2xDosO_aZSfs4UYUH4dEQlJpqSrF8&_nc_zt=23&_nc_ht=scontent.fbau3-2.fna&_nc_gid=veezg8OQ7w-2-3T_JooL9g&_nc_ss=7a32e&oh=00_AfwurB1bGA7P3bRw0rS3tTd2dACh9yXq8RSswtdyVz4KYA&oe=69C5EEAC' },
            { type: 'image', src: 'https://scontent.fbau3-2.fna.fbcdn.net/v/t51.82787-15/628052987_17855335536612516_3964391855707414886_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeE7vVcBV3_NBcqmWT-1vUDF5Rusw_7qgGnlG6zD_uqAaffFJ71tz2f5r7Ig-xjbUs1br1dB6E9E2QHjjf_KpX28&_nc_ohc=q8ssKM10cY8Q7kNvwH60_gb&_nc_oc=AdoIEzeVddfJfl4UUFemb8Nos1P5xJgJNwvOD1XG6uraQ4c5IttkWyvlspE2mDhmlO9Oc-5nNnmhiwqfdgVWXG8N&_nc_zt=23&_nc_ht=scontent.fbau3-2.fna&_nc_gid=_dfS-HwRM_xtiGYicDfP7g&_nc_ss=7a32e&oh=00_Afz6VQI66dJ70oD0tANfkc1eJP5Urka3esAW_yWdX9BY9g&oe=69C61389' },
            { type: 'html', content: '<iframe src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F25743867628542790%2F&show_text=false&width=267&t=0" width="267" height="476" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen="true"></iframe>' }
        ]
    },
    { 
        name: "Intifeme", 
        basePrice: 209,
        img: "https://api.hest.com.br/products/20251112185543193.png", 
        desc: "Spray íntimo com barbatimão e melaleuca. Frescor e equilíbrio diário.",
        options: [
            { months: 1, price: 209.90, link: "https://pay.hest.com.br/eef48a82-a6c6-4aa3-a14f-4738d440c9a9" },
            { months: 3, price: 335.70, link: "https://pay.hest.com.br/7c0eba99-dd07-46e1-89aa-857c83f4ae76" },
            { months: 5, price: 461.50, link: "https://pay.hest.com.br/feb19442-b2c6-4e86-a075-0b9dfbdbf9df" }
        ]
    },
    { 
        name: "Intimasc", 
        basePrice: 209,
        img: "https://api.hest.com.br/products/20251112183906004.png", 
        desc: "Spray íntimo masculino com óleo de menta. Conforto e higiene prolongada.",
        options: [
            { months: 1, price: 209.90, link: "https://pay.hest.com.br/8893b794-7c19-4419-804f-0538e5604222" },
            { months: 5, price: 461.50, link: "https://pay.hest.com.br/5b8ecc68-44bb-4ed7-9c5d-f14d4f68f2c4" },
            { months: 12, price: 859, link: "https://pay.hest.com.br/dfc1625d-cee9-4be0-806c-11ea58a8d3e7" }
        ]
    },
    { 
        name: "Long Beauty", 
        basePrice: 197,
        img: "https://api.hest.com.br/products/20250128152440130.png", 
        desc: "Tratamento capilar que restaura a beleza e confiança dos seus cabelos.",
        options: [
            { months: 1, price: 209.90, link: "https://pay.hest.com.br/ca891a91-fef4-4d95-bdab-3fcbab75a27a" },
            { months: 3, price: 335.70, link: "https://pay.hest.com.br/13fdcfcd-8687-4f71-b27e-7eeed51446ae" },
            { months: 12, price: 859, link: "https://pay.hest.com.br/6d065d13-2cd6-471b-aee7-3d9713e5643f" }
        ]
    },
    { 
        name: "Neumax Drops", 
        basePrice: 197,
        img: "https://api.hest.com.br/products/20250128152643280.png", 
        desc: "Biohacking para foco, cognição e memorização.",
        options: [
            { months: 1, price: 209.90, link: "https://pay.hest.com.br/df40196f-0e51-4a35-90d6-d5272ff08f3a" },
            { months: 3, price: 335, link: "https://pay.hest.com.br/4f6c3938-936f-4f5e-8107-271e64cde58a" },
            { months: 5, price: 461.50, link: "https://pay.hest.com.br/6dd45490-e3bd-40e5-b961-288012bb02d6" }
        ]
    },
    { 
        name: "Passa Tudo", 
        basePrice: 197,
        img: "https://api.hest.com.br/products/20250902120550201.png", 
        desc: "Colágeno Tipo II com vitaminas D3 e K2. Fortalece articulações e reduz inflamações.",
        options: [
            { months: 1, price: 197, link: "https://pay.hest.com.br/ba6993b7-d254-4e5e-b72a-a5e44eabe73b" },
            { months: 5, price: 397, link: "https://pay.hest.com.br/1aaf2ccc-87c6-4bf4-8e52-9c78060c2476" },
            { months: 12, price: 697, link: "https://pay.hest.com.br/2d98e062-0427-4e2b-8a99-6b2dc3820223" }
        ]
    },
    { 
        name: "Quero +", 
        basePrice: 209,
        img: "https://api.hest.com.br/products/20251127113333746.jpeg", 
        desc: "Pó com goma xantana e feno-grego. Estimula bem-estar e prazer feminino.",
        options: [
            { months: 1, price: 209.90, link: "https://pay.hest.com.br/b98ee4b7-6064-4260-a7a9-b3dc880416da" },
            { months: 5, price: 461.50, link: "https://pay.hest.com.br/6ba5966d-bcf1-45be-b16d-0d713e154715" },
            { months: 12, price: 851, link: "https://pay.hest.com.br/8bc7fa93-ca39-42b1-b273-8ba1dbc18c62" }
        ]
    },
    { 
        name: "Skin-Fit", 
        basePrice: 209,
        img: "https://api.hest.com.br/products/20251112190743205.png", 
        desc: "Colágeno Fitness com cafeína e taurina. Firmeza da pele e disposição.",
        options: [
            { months: 1, price: 209.90, link: "https://pay.hest.com.br/37690af0-14ea-452c-9c75-8d031e984024" },
            { months: 5, price: 461.50, link: "https://pay.hest.com.br/39e612cd-8a65-43fc-a528-a677c9f2acb9" },
            { months: 12, price: 859, link: "https://pay.hest.com.br/534e9ace-24f9-4ae5-a5de-4a9330176b86" }
        ],
        details: [
            { type: 'image', src: 'https://scontent.fbau3-2.fna.fbcdn.net/v/t51.82787-15/640428511_17857938111612516_4566485527624359276_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeFpxskYgwZtmhjUXq6msZTOzgigqQAtfmDOCKCpAC1-YHRD6fOYuHRu-C6acy6u3UDHnz3nPoAB0Q5-P8Tzlsur&_nc_ohc=CxuvfcOHc_4Q7kNvwHNhM4K&_nc_oc=AdoRWwZ-NTl5HWWOkjCdcAumGbmUK1dSv6L2zrpvP7_FmrDFOrktONgmwdjQdJzeRp0ftHchVOEHOFmXSMxZJz1P&_nc_zt=23&_nc_ht=scontent.fbau3-2.fna&_nc_gid=YeRIiKp3yLTphQhfQx87OQ&_nc_ss=7a32e&oh=00_AfysXNcZVqOCqPFpdl4fYeQMUC0cscvToyCdw3dNWj9JHQ&oe=69C6218C' }
        ]
    },
    { 
        name: "Termo Drink", 
        basePrice: 209.9,
        img: "https://api.hest.com.br/products/20251112192445895.png", 
        desc: "Suplemento termogênico sabor limonada suíça. Energia e foco.",
        options: [
            { months: 1, price: 209.90, link: "https://pay.hest.com.br/a9f50f74-c70f-4c99-a972-3458c12c2b50" },
            { months: 5, price: 461.50, link: "https://pay.hest.com.br/407d998f-0e6d-4393-93d0-95ae0f262b8f" },
            { months: 12, price: 859, link: "https://pay.hest.com.br/eff80e9b-6f1e-4f54-a0ea-3671e8df5068" }
        ],
        details: [
            { type: 'image', src: 'https://scontent.fbau3-2.fna.fbcdn.net/v/t51.82787-15/625054642_17854586199612516_2378698700501920610_n.webp?stp=dst-jpg_tt6&_nc_cat=104&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeFW7mZsS2tqreqz_FuKqAQdfHk-o7Kc21V8eT6jspzbVRbrNA-t_Yn4-KyYUuLhHIjOyy8N0eHlm_0cG5YqZAyt&_nc_ohc=sNm_prBPXFIQ7kNvwH9MzE1&_nc_oc=Adptpp9FMHBvp49ft_R0px6tlzzG3rjtI6AWB0Y6YNWRtzD5NdcEaCyS_LQ3mK3wVA53fDUx89LhMG-QXWC3Oylq&_nc_zt=23&_nc_ht=scontent.fbau3-2.fna&_nc_gid=R3pLDmxMdR78OWG4UtNGKg&_nc_ss=7a32e&oh=00_Afwfh6Q241BbkfRQjYLtR8GS46YuH3S--nBUwvBzGzbs4Q&oe=69C601EB' },
            { type: 'html', content: '<iframe src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F2779195572419074%2F&show_text=false&width=267&t=0" width="267" height="476" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen="true"></iframe>' }
        ]
    },
    { 
        name: "Toop Cor", 
        basePrice: 197,
        img: "https://api.hest.com.br/products/20250128152546388.png", 
        desc: "Restaura a cor natural do cabelo sem tintas.",
        options: [
            { months: 1, price: 209.90, link: "https://pay.hest.com.br/37690af0-14ea-452c-9c75-8d031e984024" },
            { months: 5, price: 461.50, link: "https://pay.hest.com.br/39e612cd-8a65-43fc-a528-a677c9f2acb9" },
            { months: 12, price: 859, link: "https://pay.hest.com.br/534e9ace-24f9-4ae5-a5de-4a9330176b86" }
        ],
        details: [
            { type: 'image', src: 'https://scontent.fbau3-2.fna.fbcdn.net/v/t39.30808-6/496936315_9896621247064388_7593352552424363192_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=e06c5d&_nc_eui2=AeFvq_oQyE6Av9-m6Xxmurmn48RxmSbnzmjjxHGZJufOaCyG2fDPGptD1B4gf9FEamvoMr085gQ8GQQ-KB7IJmDM&_nc_ohc=h88encOmlPAQ7kNvwHFNwlb&_nc_oc=Adpp7KXehGp0zs-_uhLB_U1bHIUYhCLeuDB5PKyKpYon2aig-1tLfCnVY9M0kYoU-vIbTAtqsboG6Ya3uTn0xl_G&_nc_zt=23&_nc_ht=scontent.fbau3-2.fna&_nc_gid=heZFXyEZATi89bv60DsnWg&_nc_ss=7a32e&oh=00_AfxGG_AH2jwYWUbaoWW3rK1OaNxBcvGt0V_FIGFrMnknjQ&oe=69C5F4B1' },
            { type: 'html', content: '<iframe src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Fjosiane.botelhosiqueira%2Fvideos%2F707691961716945%2F%3Fidorvanity%3D1159207878395744&show_text=false&width=476&t=0" width="476" height="476" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen="true"></iframe>' }
        ]
    }
];

// Funções do carrinho (localStorage)
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    renderCartItems();
}

function updateCartDisplay() {
    const cart = getCart();
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    
    const cartCountElement = document.getElementById('cart-count');
    const cartTotalElement = document.getElementById('cart-total');
    const offcanvasTotalElement = document.getElementById('offcanvas-total');
    
    if (cartCountElement) cartCountElement.textContent = totalItems;
    if (cartTotalElement) cartTotalElement.textContent = 'R$' + totalPrice.toFixed(2).replace('.', ',');
    if (offcanvasTotalElement) offcanvasTotalElement.textContent = 'R$' + totalPrice.toFixed(2).replace('.', ',');
}

function renderCartItems() {
    const container = document.getElementById('cart-items-container');
    const cartFooter = document.getElementById('cart-footer');
    if (!container) return;
    
    const cart = getCart();
    if (cart.length === 0) {
        container.innerHTML = '<p class="text-center text-secondary">Seu carrinho está vazio</p>';
        if (cartFooter) cartFooter.style.display = 'none';
        return;
    }
    
    if (cartFooter) cartFooter.style.display = 'block';

    container.innerHTML = cart.map((item, index) => `
        <div class="cart-item mb-3 p-3 border rounded bg-dark" style="border-color: #333 !important;" data-index="${index}">
            <div class="d-flex align-items-center gap-3 mb-2">
                <img src="${item.img}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: contain; background: white; border-radius: 5px;">
                <div class="flex-grow-1 text-white">
                    <h6 class="mb-0 fw-bold">${item.name}</h6>
                    <small class="text-light opacity-75">${item.months} ${item.months > 1 ? 'meses' : 'mês'}</small>
                    <div class="text-success fw-bold">R$ ${item.price.toFixed(2).replace('.', ',')}</div>
                </div>
                <div class="d-flex flex-column align-items-end gap-2">
                    <a href="${item.link}" target="_blank" class="btn btn-sm btn-outline-success buy-icon-cart" title="Comprar Agora" data-index="${index}">
                        <i class="bi bi-bag-check-fill"></i>
                    </a>
                    <button class="btn btn-sm btn-outline-danger remove-item" title="Remover" data-index="${index}"><i class="bi bi-trash"></i></button>
                </div>
            </div>
        </div>
    `).join('');

    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', function() {
            let cart = getCart();
            const idx = parseInt(this.dataset.index);
            cart.splice(idx, 1);
            saveCart(cart);
        });
    });

    // Lógica para o botão "Comprar Agora" individual
    document.querySelectorAll('.buy-icon-cart').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const link = this.getAttribute('href');
            const idx = parseInt(this.dataset.index);
            
            // Abre o link de compra em nova aba
            if (link) window.open(link, '_blank');
            
            // Remove o item do carrinho pois o usuário já foi comprar
            let cart = getCart();
            cart.splice(idx, 1);
            saveCart(cart);
        });
    });
}

function addToCart(product, selectedOption, quantity) {
    let cart = getCart();
    const cartItem = {
        name: product.name,
        months: selectedOption.months,
        price: selectedOption.price,
        img: product.img,
        link: selectedOption.link,
        quantity: quantity
    };
    
    const existing = cart.find(item => 
        item.name === product.name && item.months === selectedOption.months
    );
    
    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push(cartItem);
    }
    
    saveCart(cart);
    
    const cartOffcanvas = document.getElementById('cartOffcanvas');
    if (cartOffcanvas) {
        try {
            const offcanvas = bootstrap.Offcanvas.getInstance(cartOffcanvas);
            if (offcanvas) {
                offcanvas.show();
            } else {
                new bootstrap.Offcanvas(cartOffcanvas).show();
            }
        } catch (e) {
            console.log('Erro ao abrir carrinho:', e);
        }
    }
}

function buyNow(link) {
    if (link) {
        window.open(link, '_blank');
    }
}

function renderProducts(filterText = '') {
    const container = document.getElementById('product-list');
    if (!container) return;
    
    container.innerHTML = '';
    
    let filtered = products;
    if (filterText && filterText.trim() !== '') {
        const searchTerm = filterText.toLowerCase().trim();
        filtered = products.filter(p => 
            p.name.toLowerCase().includes(searchTerm) || 
            p.desc.toLowerCase().includes(searchTerm)
        );
    }
    
    if (filtered.length === 0) {
        container.innerHTML = '<div class="col-12 text-center py-5"><h4 class="text-secondary">Nenhum produto encontrado</h4></div>';
        return;
    }

    filtered.forEach((product, index) => {
        const col = document.createElement('div');
        col.className = 'col-12 col-sm-6 col-md-4 col-lg-3 mb-4';
        
        let optionsHtml = '';
        product.options.forEach((option, optIndex) => {
            const priceFormatted = 'R$ ' + option.price.toFixed(2).replace('.', ',');
            optionsHtml += `
                <div class="product-option mb-2 p-2 border rounded">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <span class="fw-bold">${option.months} ${option.months > 1 ? 'meses' : 'mês'}</span>
                        <span class="text-success fw-bold">${priceFormatted}</span>
                    </div>
                    <div class="d-flex gap-2">
                        <button class="btn btn-success btn-sm flex-grow-1 buy-now-option" 
                                data-link="${option.link}">
                            <i class="bi bi-bag-check"></i> Comprar
                        </button>
                        <button class="btn btn-outline-success btn-sm add-to-cart-option"
                                data-product-index="${index}"
                                data-option-index="${optIndex}">
                            <i class="bi bi-cart-plus"></i>
                        </button>
                    </div>
                </div>
            `;
        });

        const collapseId = `collapse-${index}-${Date.now()}`;

        const optionsCollapseId = `collapse-options-${index}`;
        const detailsCollapseId = `collapse-details-${index}`;

        let detailsSectionHtml = '';
        if (product.details && product.details.length > 0) {
            const detailsContent = product.details.map(detail => {
                if (detail.type === 'image') {
                    const imgSrc = detail.src || `https://drive.google.com/uc?export=view&id=${detail.id}`;
                    return `<img src="${imgSrc}" class="img-fluid rounded mb-2" alt="Detalhe do produto ${product.name}" style="cursor: pointer;" data-bs-toggle="modal" data-bs-target="#imageModal" data-bs-img="${imgSrc}">`;
                }
                if (detail.type === 'video') {
                    // Nota: A incorporação de vídeos do Google Drive pode ser instável. Use IDs de arquivos compartilhados publicamente.
                    return `<div class="ratio ratio-16x9 mb-2"><iframe src="https://drive.google.com/file/d/${detail.id}/preview" allow="autoplay"></iframe></div>`;
                }
                if (detail.type === 'text') {
                    return `<div class="text-start">${detail.content}</div>`;
                }
                if (detail.type === 'html') {
                    return `<div class="d-flex justify-content-center mb-2">${detail.content}</div>`;
                }
                return '';
            }).join('');

            detailsSectionHtml = `
                <button class="btn btn-outline-success w-100 mt-2" type="button" data-bs-toggle="collapse" data-bs-target="#${detailsCollapseId}">
                    <i class="bi bi-info-circle"></i> Sobre o produto
                </button>
                <div class="collapse mt-2" id="${detailsCollapseId}">
                    <div class="p-3 rounded" style="background-color: #f8f9fa;">
                        ${detailsContent}
                    </div>
                </div>
            `;
        }

        col.innerHTML = `
            <div class="card shadow-sm product-card">
                <img src="${product.img}" class="card-img-top p-3" alt="${product.name}" style="height: 180px; object-fit: contain;">
                <div class="card-body d-flex flex-column text-center">
                    <h5 class="card-title product-title">${product.name}</h5>
                    <p class="card-text small product-desc flex-grow-1">${product.desc}</p>
                    
                    <div class="mt-auto">
                        <button class="btn btn-outline-success w-100" type="button" 
                                data-bs-toggle="collapse" data-bs-target="#${optionsCollapseId}" 
                                aria-expanded="false" aria-controls="${optionsCollapseId}">
                            <i class="bi bi-chevron-down"></i> Opções de compra
                        </button>
                        <div class="collapse mt-2" id="${optionsCollapseId}">
                            <div class="product-options">
                                ${optionsHtml}
                            </div>
                        </div>
                        ${detailsSectionHtml}
                        
                    </div>
                </div>
            </div>
        `;
        
        container.appendChild(col);
    });

    document.querySelectorAll('.buy-now-option').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const link = btn.dataset.link;
            buyNow(link);
        });
    });

    document.querySelectorAll('.add-to-cart-option').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const productIndex = parseInt(btn.dataset.productIndex);
            const optionIndex = parseInt(btn.dataset.optionIndex);
            
            const originalProductIndex = products.findIndex(p => p.name === filtered[productIndex].name);
            if (originalProductIndex !== -1) {
                const product = products[originalProductIndex];
                const selectedOption = product.options[optionIndex];
                addToCart(product, selectedOption, 1);
            }
        });
    });
}

// Inicializa o Carrossel Dinâmico de Destaques
function initDynamicCarousel() {
    const carouselInner = document.querySelector('#carouselDestaques .carousel-inner');
    const carouselIndicators = document.querySelector('#carouselDestaques .carousel-indicators');
    
    if (!carouselInner || !carouselIndicators) return;
    
    // Limpa conteúdo atual
    carouselInner.innerHTML = '';
    carouselIndicators.innerHTML = '';
    
    // Filtra apenas produtos que têm a seção "details" e a embaralha
    const productsWithDetails = [...products]
        .filter(p => p.details && p.details.length > 0)
        .sort(() => 0.5 - Math.random());
        
    productsWithDetails.forEach((product, index) => {
        // Cria o indicador
        const indicator = document.createElement('button');
        indicator.type = 'button';
        indicator.dataset.bsTarget = '#carouselDestaques';
        indicator.dataset.bsSlideTo = index;
        indicator.ariaLabel = product.name;
        if (index === 0) {
            indicator.className = 'active';
            indicator.ariaCurrent = 'true';
        }
        carouselIndicators.appendChild(indicator);

        // Determina o conteúdo principal do slide (Sobre o Produto)
        const detailImage = product.details.find(d => d.type === 'image');
        if (!detailImage) return; // Pula este produto se não houver imagem nos detalhes

        const imgSrc = detailImage.src || `https://drive.google.com/uc?export=view&id=${detailImage.id}`;
        const mainContentHtml = `
            <img src="${imgSrc}" 
                 class="img-fluid rounded-4 shadow-lg product-highlight-img" 
                 alt="Detalhe ${product.name}" 
                 style="max-height: 380px; width: auto; object-fit: contain; cursor: pointer;"
                 data-bs-toggle="modal" data-bs-target="#imageModal" data-bs-img="${imgSrc}">
        `;

        // Cria o slide com layout lado a lado
        const slideHtml = `
            <div class="carousel-item ${index === 0 ? 'active' : ''}">
                <div class="slide-blur-bg" style="background-image: url('${imgSrc}');"></div>
                <div class="d-flex h-100 align-items-center justify-content-center position-relative" style="z-index: 2;">
                    <div class="container">
                        <div class="row align-items-center justify-content-center">
                            <div class="col-md-5 mb-4 mb-md-0 text-center">
                                ${mainContentHtml}
                            </div>
                            <div class="col-md-7 text-center text-md-start text-white p-4">
                                <h2 class="display-5 fw-bold text-warning mb-3" style="text-shadow: 2px 2px 4px rgba(0,0,0,0.8);">${product.name}</h2>
                                <p class="fs-4 mb-4 fw-light" style="text-shadow: 1px 1px 3px rgba(0,0,0,0.8);">${product.desc}</p>
                                <button type="button" class="btn btn-success btn-lg rounded-pill shadow px-5 fw-bold" data-bs-toggle="modal" data-bs-target="#imageModal" data-bs-img="${imgSrc}">
                                    <i class="bi bi-bag-check-fill me-2"></i> Ver Detalhes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        carouselInner.insertAdjacentHTML('beforeend', slideHtml);
    });

}

// Função para rastrear pedido (chamada pelo botão no modal)
function trackOrder() {
    const codeInput = document.getElementById('tracking-code');
    if (!codeInput) return;
    const code = codeInput.value.trim();
    if (code) {
        window.open(`https://rastreamento.correios.com.br/app/index.php?objeto=${code}`, '_blank');
    } else {
        alert('Por favor, insira um código de rastreamento');
    }
}

// Formulário de contato personalizado
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const nome = document.getElementById('contact-name').value.trim();
        const email = document.getElementById('contact-email').value.trim();
        const mensagem = document.getElementById('contact-message').value.trim();

        if (!nome || !email || !mensagem) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const assunto = encodeURIComponent(`Dúvida pelo site - ${nome}`);
        const corpo = encodeURIComponent(
            `Nome: ${nome}\n` +
            `E-mail: ${email}\n\n` +
            `Mensagem:\n${mensagem}`
        );

        const mailtoLink = `mailto:equipe.viverleve@gmail.com?subject=${assunto}&body=${corpo}`;
        window.location.href = mailtoLink;
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    initDynamicCarousel(); // Inicializa o carrossel dinâmico
    updateCartDisplay();
    renderCartItems();

    // Busca
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.querySelector('#search-form button');

    function performSearch() {
        if (searchInput) {
            const term = searchInput.value;
            renderProducts(term);
        }
    }

    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            performSearch();
        });
    }

    if (searchButton) {
        searchButton.addEventListener('click', (e) => {
            e.preventDefault();
            performSearch();
        });
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
        });
    }

    // Logo para limpar busca
    const logoLink = document.querySelector('.navbar-brand');
    if (logoLink) {
        logoLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (searchInput) {
                searchInput.value = '';
            }
            renderProducts('');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Modal de imagem (lightbox)
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    
    if (imageModal) {
        imageModal.addEventListener('show.bs.modal', function(event) {
            const trigger = event.relatedTarget;
            const imgSrc = trigger.getAttribute('data-bs-img');
            modalImage.src = imgSrc;
        });
    }

    // Scroll suave e active links
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const headerHeight = 80;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Preencher o select de produtos no modal
    const productSelect = document.getElementById('whatsapp-product-select');
    if (productSelect) {
        products.forEach(p => {
            const option = document.createElement('option');
            option.value = p.name;
            option.textContent = p.name;
            productSelect.appendChild(option);
        });
    }

    // Event listener para botões de promoção nos produtos
    document.addEventListener('click', function(e) {
        const promoBtn = e.target.closest('.promo-from-product');
        if (promoBtn) {
            e.preventDefault();
            const productName = promoBtn.dataset.productName;
            if(productSelect) productSelect.value = productName;
            
            // Limpa os campos antes de mostrar
            document.getElementById('whatsapp-name').value = '';
            document.getElementById('whatsapp-uf').value = '';
            document.getElementById('whatsapp-city').value = '';

            const discountOfferModal = new bootstrap.Modal(document.getElementById('discountOfferModal'));
            discountOfferModal.show();
        }
    });

    // --- INÍCIO LÓGICA MODAL DE DESCONTO ---
    const discountOfferModalEl = document.getElementById('discountOfferModal');
    const discountNameModalEl = document.getElementById('discountNameModal');

    if (discountOfferModalEl && discountNameModalEl) {
        const discountOfferModal = new bootstrap.Modal(discountOfferModalEl);
        const discountNameModal = new bootstrap.Modal(discountNameModalEl);
        const getDiscountBtn = document.getElementById('getDiscountBtn');
        const sendWhatsAppDiscountBtn = document.getElementById('sendWhatsAppDiscount');
        const promoButton = document.getElementById('promo-button');
        const bannerPromoBtn = document.getElementById('banner-promo-btn');

        // Função para mostrar o modal de oferta
        const showDiscountOffer = () => {
            // Verifica se o popup já foi exibido nesta sessão
            if (!sessionStorage.getItem('discountPopupShown')) {
                setTimeout(() => {
                    discountOfferModal.show();
                    sessionStorage.setItem('discountPopupShown', 'true');
                }, 3000); // Mostra após 3 segundos
            }
        };

        showDiscountOffer();

        // Novo Botão do Banner
        if (bannerPromoBtn) {
            bannerPromoBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if(document.getElementById('whatsapp-product-select')) document.getElementById('whatsapp-product-select').value = "";
                document.getElementById('whatsapp-name').value = '';
                if(document.getElementById('whatsapp-uf')) document.getElementById('whatsapp-uf').value = '';
                if(document.getElementById('whatsapp-city')) document.getElementById('whatsapp-city').value = '';
                discountOfferModal.show();
            });
        }

        getDiscountBtn.addEventListener('click', () => {
            discountOfferModal.hide();
            discountNameModal.show();
        });

        sendWhatsAppDiscountBtn.addEventListener('click', () => {
            const nameInput = document.getElementById('whatsapp-name');
            const ufInput = document.getElementById('whatsapp-uf');
            const cityInput = document.getElementById('whatsapp-city');
            const productSelectInput = document.getElementById('whatsapp-product-select');

            const userName = nameInput.value.trim();
            const userUF = ufInput ? ufInput.value.trim() : '';
            const userCity = cityInput ? cityInput.value.trim() : '';
            const productName = productSelectInput ? productSelectInput.value : '';

            if (!userName) { alert('Por favor, digite seu nome.'); nameInput.focus(); return; }
            
            const phoneNumber = '5519982668806';
            let message;

            if (productName) {
                message = `Olá! Meu nome é *${userName}*`;
                if (userCity && userUF) {
                    message += `, sou de *${userCity}/${userUF}*`;
                }
                message += `.\n\nTenho interesse no produto *${productName}* e gostaria de receber um desconto!`;
            } else {
                message = `Olá! Meu nome é *${userName}*`;
                if (userCity && userUF) {
                    message += `, sou de *${userCity}/${userUF}*`;
                }
                message += `.\n\nVisitei o site e gostaria de receber um desconto!`;
            }

            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
            discountNameModal.hide();
        });
    }
    // --- FIM LÓGICA MODAL DE DESCONTO ---
});
