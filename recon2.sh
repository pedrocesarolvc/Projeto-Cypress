#!/bin/bash
mkdir -p recon2
UA="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36"
B=https://automationteststore.com
CJ=/tmp/cj2
g(){ curl -sL -A "$UA" -b $CJ -c $CJ "$B/$1" -o "recon2/$2"; echo "$2 $(wc -c < recon2/$2)"; }
p(){ curl -sL -A "$UA" -b $CJ -c $CJ -X POST "$B/$1" "${@:3}" -o "recon2/$2"; echo "$2 $(wc -c < recon2/$2)"; }
g "index.php?rt=product/product&product_id=50" product50.html
g "index.php?rt=product/product&product_id=51" product51.html
g "index.php?rt=product/product&product_id=53" product53.html
g "index.php?rt=product/special" special.html
g "index.php?rt=checkout/cart&product_id=50" cart_add50.html
g "index.php?rt=checkout/cart&product_id=51" cart_add51.html
g "index.php?rt=checkout/cart" cart_two.html
p "index.php?rt=checkout/cart" cart_update.html --data-urlencode "quantity[50]=3" --data-urlencode "cart=1"
p "index.php?rt=content/contact&form_id=2" contact_empty.html --data-urlencode "first_name=" --data-urlencode "email=" --data-urlencode "enquiry="
p "index.php?rt=content/contact&form_id=2" contact_bad_email.html --data-urlencode "first_name=Teste" --data-urlencode "email=emailinvalido" --data-urlencode "enquiry=abc"
p "index.php?rt=content/contact&form_id=2" contact_ok.html --data-urlencode "first_name=Teste QA" --data-urlencode "email=teste.qa@example.com" --data-urlencode "enquiry=Mensagem automatizada de teste de interface com Cypress para validacao academica."
g "index.php?rt=checkout/cart&remove=50" cart_removed.html
