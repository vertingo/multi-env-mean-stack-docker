# Introduction
Ce document a pour but de vous guider dans l’initialisation d’un environnement Docker pour les développeurs.

## Installation de Docker

Procédure d'installation de docker desktop par OS

- MAC : https://docs.docker.com/docker-for-mac/install
- UBUNTU: https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/
- WSL: https://university.niji.fr/course/play/5ed79232a6a5dd57d589f92f
## Installation de Docker compose

Procédure d'installation de compose par OS

https://docs.docker.com/compose/install/

## Remarques
le projet a été testé sur la configuration suivante :

- VM de Dev :
  * Ubuntu 14.04, Ubuntu 16.04
  * Docker version 17.05.0-ce
  * docker-compose version 1.17.1
- MAC OS :
  * **todo**
- Windows :
  * Windows 10
  * Docker version 18.09.0
  * docker-compose version 1.23.2

# Installation de make sur Windows
Lien de téléchargement de l'executable : https://sourceforge.net/projects/gnuwin32/files/make/3.81/make-3.81.exe/download?use_mirror=datapacket&download=

Lancer make.exe et suivre la procédure d'installation. 
Vérifier dans une invite de commande que la commande "make" éxiste. 

# Configuration de Docker Desktop for Windows
Dans Docker Desktop > Settings > Shared drive > Partager les disques qui seront utilisés par les containers (obligatoire). 

Note : Si après validation de votre login/mdp les disques se décochent automatiquement, essayer de reboot Docker et/ou Windows. Si cela ne fonctionne toujours pas il faut effectuer un reset de Docker : dans Settings > Reset > Reset to Factory defaut... (seule solution qui a fonctionné). 

N’hésitez pas à contribuer et ajouter les subtilités propres à chaque environnement (MAC OS, Windows,...).

À l’aide de la commande ci-dessous, créer un réseau docker nommé reverse-proxy.
Ce dernier servira à exposer n’importe quels services http via traefik (https://github.com/containous/traefik)

```
# Mise en place des services de base


# Configuration DNS (à exécuter qu'une seule fois)

Afin que macOS ou Windows utilise ce serveur DNS pour résoudre les noms en *.docker.devhost, il faut les configurer comme suit:
L'adresse du serveur DNS est celle attribuée par le DHCP du réseau privé hôte de virtualbox. (Par défaut, dans la version actuelle, sera configurée avec 192.168.56.101 à la création de la première VM)

**macOS**

Créer, en tant que root (via sudo), un fichier */etc/resolver/docker-devhost* avec le contenu suivant:

```bash
domain docker.devhost
nameserver REVERSE_PROXY_HOST_IP
```

**Windows (si usage d'une VM de dèv host de Docker)**

Exécuter les commandes suivante dans un client de commande **en mode Administrateur** :

Voici l'ensemble des dnsservers
```bash
netsh interface ipv4 show dnsservers
```

```bash
...
Configuration pour l'interface « VirtualBox Host-Only Network »
    Serveurs DNS configurés statiquement : Aucun
    Enregistrer avec le suffixe :           Principale uniquement
...
```
Ici l'objectif est d'ajouter ${REVERSE_PROXY_HOST_IP} dans la liste des serveurs DNS et de le positionner en premier dans la liste

```bash
netsh interface ipv4 add dnsserver "VirtualBox Host-Only Network" address= ${REVERSE_PROXY_HOST_IP} index=1
```

On vérifie que c'est ok
```bash
netsh interface ipv4 show dnsservers
```

```bash
...
Configuration pour l'interface « VirtualBox Host-Only Network »
    Serveurs DNS configurés statiquement : REVERSE_PROXY_HOST_IP
    Enregistrer avec le suffixe :           Principale uniquementt
...
```

Normalement (ça peut prendre un peu de temps) le nslookup doit fonctionner

```bash
nslookup traefik.docker.devhost
```
```bash
Serveur :   UnKnown
Address:   ${REVERSE_PROXY_HOST_IP}

Nom :    traefik.docker.devhost
Address:   ${REVERSE_PROXY_HOST_IP}
```

Normalement le reste du web est toujours dispo

```bash
nslookup www.google.fr
```
```bash
Serveur :   UnKnown
Address:   ${REVERSE_PROXY_HOST_IP}

Réponse ne faisant pas autorité :
Nom :    www.google.fr
Addresses:  2a00:1450:4007:810::2003
          216.58.213.131
```

**Windows (si usage de Docker for Windows)**

dnsmaq ne fonctionne pas avec WSL (Windows Subsystem Linux).

Ici la solution consiste à utiliser un DNS proxy permettant de résoudre les domaines avec wildcard (en l'occurence *.docker.devhost).

*http://mayakron.altervista.org/wikibase/show.php?id=AcrylicHome*

Ajouter la section suivante dans le fichier host d'Acrylic (via la commande fournie par Acrylic)
```bash
"C:\Program Files (x86)\Acrylic DNS Proxy\AcrylicController.exe" EditAcrylicHostsFile
```

```
127.0.0.1 *.docker.devhost
```

Il est aussi nécessaire de renvoyer la résolution DNS en local (cmd en mode administrateur)

```bash
netsh interface ipv4 show dnsservers
```

```bash
netsh interface ipv4 add dnsserver "vEthernet (DockerNAT)" address=${REVERSE_PROXY_HOST_IP} index=1
```

*Rappel ici REVERSE_PROXY_HOST_IP=127.0.0.1*

# Probleme de performance

## Mac OS
Depuis la mise a jour 18.0.3 de docker for Mac le montage NFS est disponible pour les volumes et regle certain probleme de performance.

La configuration des volumes est disponible [ici](https://forums.docker.com/t/nfs-native-support/48531/4)
