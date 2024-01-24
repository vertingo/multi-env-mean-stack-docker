argc="$@"

function start_grafana 
{
  echo "Start Grafana Monitoring Stack in progress..."
  # Restart + clear Logs
  #--------------------------
  docker-compose -f $(pwd)/devops/env/monitoring/grafana/docker-compose.yml stop
  #vide les logs
  truncate -s 0 /var/lib/docker/containers/*/*-json.log
  docker-compose -f $(pwd)/devops/env/monitoring/grafana/docker-compose.yml up -d --remove-orphans
}

case $1 in
     "--start")
      if [ -f devops/env/monitoring/grafana/.env ]
      then
        start_grafana
      else
        echo "ln $(pwd)/.env.dist.grafana  devops/env/monitoring/grafana/.env"
				sudo ln -s "$(pwd)/.env.dist.grafana"  devops/env/monitoring/grafana/.env
        start_grafana
		  fi;;
      "--backup")
        echo "Backup the Docker Stack in progress..."
        docker-compose -f $(pwd)/devops/env/monitoring/grafana/docker-compose.yml run backup;;
      "--backup-list")
        echo "List of the possible backup to restore:"
        docker-compose -f $(pwd)/devops/env/monitoring/grafana/docker-compose.yml run backup list;;
      "--backup-restore")
        if [ -z $2 ] 
        then
          echo "No paramater specify for restoration you must type make backup-restore 'param' between quote with the name of the backup obtained with make backup-list"
          echo "If it doesn't work you can also do it by executing this command: sudo bash devops/env/monitoring/grafana/setup.sh --backup-restore 'param_id_of_the_backup'"
        else
          echo "Restoration of the Docker Stack in progress..."
          docker-compose -f $(pwd)/devops/env/monitoring/grafana/docker-compose.yml run backup restore $2 
          echo "If it doesn't work you can also do it by executing this command: sudo bash devops/env/monitoring/grafana/setup.sh --backup-restore 'param_id_of_the_backup'"
        fi;;
      "--allow-mongodb-ip")
        if [ -z $2 ]
        then
          echo "No paramater specify for allowing ip adress you must type make allow-from-ip-ufw-mongodb-connection your-ip-adress-to-allow"
          echo "If it doesn't work you can also do it by executing this command: ufw route allow proto tcp from your-ip-adress-to-allow to 172.20.0.2 port 27017"
        else
          is_mongodb_running=$(docker container inspect -f '{{.State.Running}}' socializus_mongodb)
          if [ ${is_mongodb_running} == 'true' ]
          then
                echo "Allowing of the following ip: ${2} to access MongoDB on the server:"
                container_ip=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' socializus_mongodb)
                ufw route allow proto tcp from $2 to ${container_ip} port 27017
          else
                echo "No MongoDB Instance running. Start an instance with make start"
          fi
          echo "If it doesn't work you can also do it by executing this command: ufw route allow proto tcp from your-ip-adress-to-allow to 172.20.0.2 port 27017"
        fi;;
      "--delete-mongodb-ip")
        if [ -z $2 ]
        then
          echo "No paramater specify for allowing ip adress you must type make delete-allow-ip-ufw-for-mongodb-connection your-ip-adress-to-allow"
          echo "If it doesn't work you can also do it by executing this command: ufw route delete allow proto tcp from your-ip-adress-to-allow to 172.20.0.2 port 27017"
        else
          is_mongodb_running=$(docker container inspect -f '{{.State.Running}}' socializus_mongodb)
          if [ ${is_mongodb_running} == 'true' ]
          then
                echo "Deleting of the following ip: ${2} to access MongoDB on the server:"
                container_ip=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' socializus_mongodb)
                ufw route delete allow proto tcp from $2 to ${container_ip} port 27017
          else
                echo "No MongoDB Instance running. Start an instance with make start"
          fi
          echo "If it doesn't work you can also do it by executing this command: ufw route delete allow proto tcp from your-ip-adress-to-allow to 172.20.0.2 port 27017"
        fi;;      
      "--kill")
        if [ -f devops/env/monitoring/grafana/.env ]
        then
          echo "Destroy Grafana Monitoring Stack in progress..."
          docker-compose -f $(pwd)/devops/env/monitoring/grafana/docker-compose.yml down --volumes --remove-orphans
          echo "rm $(pwd)/devops/env/monitoring/grafana/.env"
          sudo rm "$(pwd)/devops/env/monitoring/grafana/.env"
        else
          echo "Cannot kill env monitoring. Environment has not been created yet. Create it with make start-monitoring"
		    fi;;
esac
