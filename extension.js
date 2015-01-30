(function () {

    //Define our function responsible for extending the bot.
    function extend() {
        //If the bot hasn't been loaded properly, try again in 1 second(s).
        if (!window.bot) {
            return setTimeout(extend, 1 * 1000);
        }

        //Precaution to make sure it is assigned properly.
        var bot = window.bot;

        //Load custom settings set below
        bot.retrieveSettings();

        /*
         Extend the bot here, either by calling another function or here directly.
         Model code for a bot command:
         bot.commands.commandCommand = {
         command: 'cmd',
         rank: 'user/bouncer/mod/manager',
         type: 'startsWith/exact',
         functionality: function(chat, cmd){
         if(this.type === 'exact' && chat.message.length !== cmd.length) return void (0);
         if( !bot.commands.executable(this.rank, chat) ) return void (0);
         else{
         //Commands functionality goes here.
         }
         }
         }
         */
		 
		 rulesCommand: {
                command: 'crules',
                rank: 'user',
                type: 'exact',
                functionality: function (chat, cmd) {
                    if (this.type === 'exact' && chat.message.length !== cmd.length) return void (0);
                    if (!basicBot.commands.executable(this.rank, chat)) return void (0);
                    else {
                        if (typeof basicBot.settings.crulesLink === "string")
                            return API.sendChat(subChat(basicBot.chat.roomrules, {link: basicBot.settings.crulesLink}));
                    }
                }
            },
			
			rulesCommand2: {
                command: 'srules',
                rank: 'user',
                type: 'exact',
                functionality: function (chat, cmd) {
                    if (this.type === 'exact' && chat.message.length !== cmd.length) return void (0);
                    if (!basicBot.commands.executable(this.rank, chat)) return void (0);
                    else {
                        if (typeof basicBot.settings.srulesLink === "string")
                            return API.sendChat(subChat(basicBot.chat.roomrules, {link: basicBot.settings.srulesLink}));
                    }
                }
            },
		 
		 
		 
		 intervalMessage2: function () {
                var interval;
                if (basicBot.settings.motdEnabled) interval = basicBot.settings.messageInterval2;
                else interval = basicBot.settings.messageInterval2;
                if ((basicBot.room.roomstats.songCount % interval) === 0 && basicBot.status) {
                    var msg;
                    if (basicBot.settings.motdEnabled) {
                        msg = basicBot.settings.motd;
                    }
                    else {
                        if (basicBot.settings.intervalMessages.length === 0) return void (0);
                        var messageNumber = basicBot.room.roomstats.songCount % basicBot.settings.intervalMessages.length;
                        msg = basicBot.settings.intervalMessages2[messageNumber];
                    }
                    API.sendChat(msg);
                }
		 },	

        bot.commands.baconCommand = {
            command: 'bacon',  //The command to be called. With the standard command literal this would be: !bacon
            rank: 'user', //Minimum user permission to use the command
            type: 'exact', //Specify if it can accept variables or not (if so, these have to be handled yourself through the chat.message
            functionality: function (chat, cmd) {
                if (this.type === 'exact' && chat.message.length !== cmd.length) return void (0);
                if (!bot.commands.executable(this.rank, chat)) return void (0);
                else {
                    API.sendChat("/me Bacon!!!");
                }
            }
        };

        //Load the chat package again to account for any changes
        bot.loadChat();

    }

    //Change the bots default settings and make sure they are loaded on launch

    localStorage.setItem("basicBotsettings", JSON.stringify({
        botName: "KamiBOT-san",
        language: "english",
        chatLink: "https://rawgit.com/Kouta-nya/basicBot-customization/blob/master/langIndex.json",
        maximumAfk: 20,
        afkRemoval: true,
        maximumDc: 120,
        bouncerPlus: true,
        lockdownEnabled: false,
        lockGuard: false,
        maximumLocktime: 10,
        cycleGuard: true,
        maximumCycletime: 10,
        timeGuard: true,
        maximumSongLength: 8,
        autodisable: true,
        commandCooldown: 30,
        usercommandsEnabled: true,
        lockskipPosition: 2,
        lockskipReasons: [
            ["theme", "This song does not fit the room theme. "],
            ["op", "This song is on the OP list. "],
            ["history", "This song is in the history. "],
            ["mix", "You played a mix, which is against the rules. "],
            ["sound", "The song you played had bad sound quality or no sound. "],
            ["nsfw", "The song you contained was NSFW (image or sound). "],
            ["unavailable", "The song you played was not available for some users. "]
        ],
        afkpositionCheck: 15,
        afkRankCheck: "ambassador",
        motdEnabled: false,
        motdInterval: 3,
        motd: "Temporary Message of the Day",
        filterChat: true,
        etaRestriction: false,
        welcome: true,
        opLink: null,
        crulesLink: http://bit.ly/dna-c-rules,
		srulesLink: http://bit.ly/dna-s-rules,
        themeLink: null,
        fbLink: null,
        youtubeLink: null,
        website: http://dnamusic.8u.cz/,
        intervalMessages: [
		"Hey you! Did you see our web page? A big mistake! Check it out > http://dnamusic.8u.cz/",
		"How are you people? I'm watching you all the time :)",
		"Have you been disconnected? Jump to wait list and use *!dc* I'll put you to right place ;) ",
		"Better speak English here. I would like to understand you too > . <",
		"Don't forget to read our community rules > http://bit.ly/dna-c-rules ",
		"We all are happy you are here with us. If you would like to know something, just ask ;)",
		"Are you not sure if your song is allowed to play here? Check this > http://bit.ly/dna-s-rules",
		"Did you notice me? I am here for you when you will disconnect. Just go back to wait list and write *!dc*",
		"I'm customized version of *BasicBot* from Yemasthui made by Kouta-nya. Arigatou senpai ^^",
		],
        messageInterval: 5,
		intervalMessages2:[],
		messageInterval: 30,
        songstats: false,
        commandLiteral: "!",
        blacklists: {
            NSFW: "https://rawgit.com/Kouta-nya/basicBot-customization/blob/master/blacklists/ExampleNSFWlist.json",
            OP: "https://rawgit.com/Kouta-nya/basicBot-customization/blob/master/blacklists/ExampleOPist.json"
        }
    }));

    //Start the bot and extend it when it has loaded.
    $.getScript('https://rawgit.com/Yemasthui/basicBot/master/basicBot.js', extend);

}).call(this);
