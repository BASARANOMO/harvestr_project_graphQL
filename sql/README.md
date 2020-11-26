# For what purpose?

schema.sql: create tables

schemaDrop.sql: drop all tables in database (destroy database structure)

schemaTrunc.sql: clean data in all tables but keep their structure

# How to use?

```
$ psql -d dbname -U username
$ \i sql/scriptname.sql
```

// dbname: harvestrdb

// username: postgres
