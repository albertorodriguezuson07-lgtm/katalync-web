FROM nginx:alpine
COPY index.html /usr/share/nginx/html/
COPY app.html /usr/share/nginx/html/
COPY app/ /usr/share/nginx/html/app/
COPY legal.html /usr/share/nginx/html/
COPY privacidad.html /usr/share/nginx/html/
COPY terminos.html /usr/share/nginx/html/
COPY assets/ /usr/share/nginx/html/assets/
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
