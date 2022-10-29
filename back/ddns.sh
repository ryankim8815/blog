### Google Dynamic DNS: https://support.google.com/domains/answer/6147083

HOSTNAME="dogfoot.info"
USERNAME="DRJ5uhslpBt3iUXQ"
PASSWORD="701YADibIKqN5JHQ"

IP=$(curl -s "https://domains.google.com/checkip")
URL="https://domains.google.com/nic/update?hostname=${HOSTNAME}&myip=${IP}"
curl --user ${USERNAME}:${PASSWORD} -s $URL

# # Resolve current public IP
# IP=$( dig +short myip.opendns.com @resolver1.opendns.com )
# # Update Google DNS Record
# URL="https://${USERNAME}:${PASSWORD}@domains.google.com/nic/update?hostname=${HOSTNAME}&myip=${IP}"
# curl -s $URL