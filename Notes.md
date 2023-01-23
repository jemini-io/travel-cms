# Notes

## DB

To import, drop an exported db file into `./dc-tmp`.

```sh
# creates a default database
docker-compose up

# to import files
docker-compose exec db sh
mysql -uroot -pexample travel-dev < tmp/{name-of-file}
```

### Migrating content

<https://www.mattjcowan.com/funcoding/2020/05/16/migrating-content-from-wordpress-to-strapi/>
<https://hashinteractive.com/blog/migrating-a-wordpress-blog-to-strapi/>
