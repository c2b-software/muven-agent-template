# muven-agent-template

## What?

This repository is used as base for the agent implementations to come. All the dependencies and overall structure is 
already done, the only thing you, as a developer, has to worry about is to create the DTOs and client calls.


## How?

```shell
$ npx degit c2b-software/muven-agent-template muven-agent-whatever
$ cd muven-agent-whatever
```


## Why?

After running the above commands, you'll already have the base structure created and you'll be almost ready to go. But you'll still need to do some renamings.

- __NAME__ has to be renamed to whatever name you want to give to the sdk being created (Vtex, Tray, MercadoLivre, etc) - Notice this name will be used in imports and exports as well as in class namings, so choose a name that's a valid Typescript word (prefer MercadoLivre instead of Mercado Livre, for example).

- __SDK-NAME__ has to be renamed to whatever SDK you're implementing (example: sdk-vtex, sdk-tray, sdk-mercado-livre, etc). Choose a lowercase naming;

- __MUVEN-AGENT-NAME__ has to be renamed to whatever agent you're implementing (example: muven-agent-vtex, muven-agent-tray, muven-agent-mercado-livre, etc). Choose a lowercase naming;

- __URL-TO-DOCS__ has to be renamed to the URL that has all the contract information. Endpoints, expected returned status, response payloads, request payloads, etc.


## And?

Last but not least, you have to install all the dependencies. Run:

```shell
$ yarn
```

And now you're ready to roll. Have fun!


---
You can remove everything from here and above.
---


# __MUVEN-AGENT-NAME__

Docs: __URL-TO-DOCS__