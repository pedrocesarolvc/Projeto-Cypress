#!/bin/bash
mkdir -p recon
UA="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36"
B=https://automationteststore.com
CJ=/tmp/cj
g(){ curl -sL -A "$UA" -b $CJ -c $CJ "$B/$1" -o "recon/$2"; echo "$2 $(wc -c < recon/$2)"; }
g "" home.html
g "index.php?rt=product/category&path=68" cat68.html
g "index.php?rt=product/category&path=43" cat43.html
g "index.php?rt=product/category&path=36" cat36.html
g "index.php?rt=content/contact" contact.html
g "index.php?rt=product/search&keyword=shirt" search_ok.html
g "index.php?rt=product/search&keyword=zzzzxxqq" search_none.html
g "index.php?rt=checkout/cart" cart_empty.html
g "index.php?rt=account/login" login.html
PID=$(grep -o 'product_id=[0-9]*' recon/cat68.html | head -1 | cut -d= -f2)
echo "PID=$PID"
g "index.php?rt=product/product&product_id=$PID" product.html
g "index.php?rt=checkout/cart&product_id=$PID" cart_add.html
g "index.php?rt=checkout/cart" cart_full.html
