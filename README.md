# Vitor Fantoni — Advogado | Direito Médico e da Saúde

Landing page estática (HTML, CSS e JavaScript, sem build) de Vitor Fantoni, advogado em Ribeirão Preto.

## Estrutura

```
index.html          página única
robots.txt          regras para buscadores
sitemap.xml         mapa do site
site.webmanifest    nome e ícones do site (atalho no celular)
vercel.json         cache dos assets e cabeçalhos de segurança
assets/
  css/style.css
  js/main.js        menu mobile, revelação ao rolar, botão flutuante do WhatsApp
  fonts/            Manrope (woff2)
  img/              fotos e imagem de compartilhamento (og-image.jpg)
  icons/            favicon e ícones
  logo/  stamp/     marca e selo em SVG
```

## Rodar localmente

```
npx http-server -p 5173 -c-1
```

Abra http://127.0.0.1:5173. `?static` no endereço mostra tudo já revelado (útil para capturas de tela).

## Deploy

Sem build: a raiz do projeto é publicada como está. Hoje o site está no GitHub Pages (branch `main`, raiz), em https://osamuelpadua.github.io/vitor-fantoni/; a cada push na `main` ele é publicado de novo.

## Domínio

O domínio definitivo ainda não foi escolhido. Enquanto isso, as URLs absolutas apontam para o endereço do GitHub Pages, `https://osamuelpadua.github.io/vitor-fantoni`, em:

- `index.html`: canonical, Open Graph (incluindo a imagem de compartilhamento), Twitter e JSON-LD;
- `robots.txt`;
- `sitemap.xml`.

Para trocar tudo de uma vez quando o domínio existir:

```
grep -rl "osamuelpadua.github.io/vitor-fantoni" index.html robots.txt sitemap.xml | xargs sed -i "s#https://osamuelpadua.github.io/vitor-fantoni#https://NOVO-DOMINIO#g"
```

A imagem de compartilhamento (`assets/img/og-image.jpg`) precisa de uma URL absoluta que já esteja no ar; sem isso, o WhatsApp e as redes mostram o link sem thumb.

Ao mudar CSS ou JS, aumente o `?v=` das referências no `index.html` para renovar o cache.
