#!/usr/bin/bash

usage()
{
printf "[+] Root Permission Required [+] \n\n-> Usage : sudo ./setup.sh \n"
exit
}

init()
{
	if  which node &>/dev/null ;then
		echo "[+] NodeJs Installed"
		
	else
		echo "------------- Installing NodeJs -----------------"
		command apt-get install nodejs
	fi


	if  which node &>/dev/null ;then
		echo "[+] Npm Installed"
	else
		echo "------------- Installing Npm -----------------"
		command apt-get install npm 


	fi
	
	


}

[ $(id | cut -d= -f2 | cut -d'(' -f1) -ne 0 ] && usage 

init

