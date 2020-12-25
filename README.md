# Raspberry Pi 4 Cheat Sheet
List of commands, configurations and tips for Raspberry Pi and Linux beginners. Also known as a quick start guide.

# Raspberry Pi OS / Linux
## Pi user default password
Default password for pi user is "raspberry"

## Enable SSH
To enable SSH, which is disabled by default in Raspbian, just put an empty `ssh` file with no extension on `/boot` partition.

## Useful configs
Go to `/boot/config.txt` and add these entries in the end of the file.
##### Or directly from terminal
```
sudo nano /boot/config.txt
```
### Overclocking
##### CPU
```
over_voltage=6
arm_freq=2000
core_freq=600
```

##### GPU
```
gpu_freq=750
gpu_mem=128
```

##### Override temperature limit
```
temp_limit=75
```

### Enable 64-bit kernel
```
arm_64bit=1
```

### Miscellaneous
##### Disable splash screen
```
disable_splash=1
```

##### Disable Wi-Fi
```
dtoverlay=disable-wifi
```

##### Disable Bluetooth
```
dtoverlay=disable-bt
```

##### Disable camera
```
start_x=0
```

## Beta / stable releases
##### Edit `rpi-eeprom-update` file
```
sudo nano /etc/default/rpi-eeprom-update
```
##### and change content to
```
FIRMWARE_RELEASE_STATUS="beta"
```
##### or
```
FIRMWARE_RELEASE_STATUS="stable"
```

## Shutdown / Reboot
##### Shutdown
```
sudo shutdown -h now
```
##### Reboot
```
sudo shutdown -r now
```
##### Uptime
```
uptime
```

## Kernel version
##### Check kernel version and info
```
uname -a
```

## Update / Upgrade everything
##### One-liner
```
sudo apt-get update -y && sudo apt-get upgrade -y && sudo apt-get dist-upgrade -y && sudo apt-get autoremove -y && sudo rpi-eeprom-update -a
```
## Read system logs real-time
##### List last 30 lines from system logs and updates in real-time
```
tail -f -n 30 /var/log/syslog
```

## Audio
##### Testing audio on default output
```
speaker-test -c2 -twav -l7
```

## MicroSD
##### Benchmark
```
sudo apt install agnostics
```
```
sh /usr/share/agnostics/sdtest.sh
```

## Chromium / Chrome
##### Chromium screen tearing fix
```
sudo rm /etc/xdg/autostart/xcompmgr.desktop
```

## Read temperature
##### One time read CPU temp
```
echo "$(($(</sys/class/thermal/thermal_zone0/temp)/1000))'C"
```
##### One time read GPU temp
```
vcgencmd measure_temp
```
##### One time read GPU temp
```
watch -n 0.1 vcgencmd measure_temp
```

## RAM
##### Currently free memory and swap usage
```
free -m
```

## Cron
##### View cron tab
```
crontab -e
```

##### View Cron logs
```
grep CRON /var/log/syslog
```

## Network
Check public IP
```
curl ifconfig.me
```

# Pi-hole
## Installation
##### Original instruction is missing `sudo` for bash
```
sudo curl -sSL https://install.pi-hole.net | sudo bash
```

## Set password
#### Set password for the dashboard or completely remove it
```
pihole -a -p
```

## Upgrade Pi-hole
##### Download and install the latest version
```
pihole -up
```

## Pi-hole Crontab
##### Edit pi-hole crontab for auto-updates
```
sudo nano /etc/cron.d/pihole
```
##### And change appropriate line to in example:
```
0 2 * * *   root    PATH="$PATH:/usr/local/bin/" pihole updateGravity >/var/log/pihole_updateGravity.log || cat /var/log/pihole_updateGravity.log
```
##### Which means everyday at 2AM

## Update Gravity
##### Download latest blocklists
```
pihole updateGravity
```

## Gravity update logs
##### Read last gravity update logs or watch it in real-time.
```
tail -f -n 30 /var/log/pihole_updateGravity.log
```