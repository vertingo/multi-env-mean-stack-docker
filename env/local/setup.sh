#!/bin/bash
v_flag='v1';
s_flag='linux'

while test $# -gt 0; do
  case "$1" in
    -h|--help)
      echo "install portainer and traefik for local env"
      echo " "
      echo "options:"
      echo "-h, --help               show brief help"
      echo "-v, --version=VERSION    specify version traefik use v1|v2 default v1"
      echo "-s, --system=SYSTEM      specify OS System linux|wsl default linux"
      exit 0
      ;;
    -v)
      shift
      if test $# -gt 0; then
        v_flag=$1
      else
        echo "no version specified"
        exit 1
      fi

      shift
      ;;
    --version=*)
       v_flag=`echo $1 | sed -e 's/^[^=]*=//g'`
       if [ -z "${v_flag}" ]; then
          echo "no version specified"
          exit 1
       fi
      shift
      ;;
    -s)
      shift
      if test $# -gt 0; then
        s_flag=$1
      else
        echo "no system specified"
        exit 1
      fi

      shift
      ;;
    --system=*)
       s_flag=`echo $1 | sed -e 's/^[^=]*=//g'`
       if [ -z "${s_flag}" ]; then
          echo "no system specified"
          exit 1
       fi
      shift
      ;;
    *)
          echo "option not recognized"
          exit 1
      break
      ;;
  esac
done

if [[ "$v_flag" =~ ^(v1|v2)$ ]]; then
    echo "version traefik ${v_flag}"
else
     echo "version traefik is not recognized ${v_flag}"
     exit 1
fi

if [[ "$s_flag" =~ ^(linux|wsl)$ ]]; then
     echo "system ${s_flag}"
else
     echo "system is not recognized ${s_flag}"
     exit 1
fi

rm -f .env

case "$v_flag" in
    v1)
      shift
        if [[ "$s_flag" = "linux" ]]
        then
            cp ../../.env.dist.local .env
			sudo ln -s "$(pwd)../../.env" .env
            make traefik-v-one-linux
            echo "install linux v1"
        else
            cp ../../.env.dist.wsl.local .env
			sudo ln -s "$(pwd)../../.env" .env
            make traefik-v-one-wsl
            echo "install wsl v1"
        fi
      shift
     ;;
    v2)
      shift
        if [[ "$s_flag" = "linux" ]]
        then
            cp ../../.env.dist.local ../../.env
			sudo ln -s "$(pwd)../../.env" .env
            make traefik-v-two-linux
            echo "install linux v2"
        else
            cp ../../.env.dist.local.wsl .env
			sudo ln -s "$(pwd)../../.env" .env
            make traefik-v-two-wsl
            echo "install wsl v2"
        fi
      shift
      ;;
  esac
