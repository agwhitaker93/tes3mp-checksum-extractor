# TES3MP Checksum Extractor

Extracts plugin names and checksums from provided tes3mp-client log files.

This is handy if you want to set up mods for your TES3MP server. More details can be found [here](https://steamcommunity.com/groups/mwmulti/discussions/1/353916184342480541/) under the heading "How do I set up the client mods for my server?"

## Usage - NOT TESTED ON WINDOWS YET, LINE SEPERATORS MAY BE A PROBLEM

Attempt to access your server with desired mods enabled on your client. This will fail, but will generate a log file containing a list of all the mods you tried to use, and their checksums.  
On Linux, they can be found at `/home/users/username/.config/openmw`  
On Windows, they can be found at `C:\Users\Username\Documents\My Games\OpenMW`

Copy the log file in question to this directory, then run the program from a terminal like this:

```sh
$ node tes3mp-checksum-extractor.js
```

This will generate a requiredDataFiles.json file, prepended with the date and time in the log filename

Either copy the contents into your server's existing `requiredDataFiles.json`, or rename and move it
