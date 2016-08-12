server.orange-opensource.github.com
=======================

Manage API calls on github to pull Adobe informations

# Run on Cloud Foundry

This version of server.adobe.github.com as been made to be runnable on Cloud Foundry, a `manifest.yml`
file has been provided to help you to push this app on cloud foundry.

Step to install it:

1. clone this repo: `$ git clone https://github.com/Orange-OpenSource/server.orange-opensource.github.com.git`
2. enter the new directory created in command line: `$ cd server.orange-opensource.github.com`
3. edit the `manifest.yml` file (*mostly what is inside `env:`*)
4. target your Cloud Foundry with `cf login`
5. push your app by running command line `cf push`

# Run outside of Cloud Foundry
## Start

After installing dependencies with `npm install`, you can lunch the server with:

```
node server.js
```

## Use

Here is the routes you can call:

- `/` : every Adobe organisations, repositories, languages used on github.
- `/update` : update all json, pulling them from adobe.github.com repo.

## Config

### Start server

If you want to lunch the process in background, simply use:
```
nohup node server.js &
```


### GitHub account

In order for the app to make Github API calls without reaching the limit, you need to authentificate.

The ID and pass are pulled from the local environement variables. Add those lines in your `~/.bashrc`:

```
export GHUSER=[userName]
export GHPASS=[userPassword]
```

### Production

It is better to use PM2 to launch your instance in production. More info [here](https://www.digitalocean.com/community/articles/how-to-use-pm2-to-setup-a-node-js-production-environment-on-an-ubuntu-vps).

```
pm2 start server.js
```

Once you push your server in production, you need to update your environnement variable NODE_ENV. It will mainly activating your NewRelic manager.

```
export NODE_ENV=production
```

### Port managing

The default port is 5000. To be able to call on 80, 2 options:

- bind the input port 80 to 8000:

```
sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 8080
sudo iptables-save
```

- change env variable

```
export PORT=80
```