const Discord = require('discord.js');
const client = new Discord.Client();
const activities = require('./assets/activities');

client.on('ready', () => {
	console.log(`${client.user.tag} adiyla bot baslatildi. Kimlik: ${client.user.id}`);
	client.setInterval(() => {
		const activity = activities[Math.floor(Math.random() * activities.length)];
		client.user.setStatus('available')
		client.user.setPresence({
			game: {
				name: activity.text,
				type: activity.type
			}
		});
    }, 60000);
});
client.on('error', console.error);

function clean(text) {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}

const events = {
	MESSAGE_REACTION_ADD: 'messageReactionAdd',
	MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
};

/*client.on('guildMemberUpdate', (oldMember, newMember) => {
	console.log(`${newMember.guild.roles.array()}`);
	if (newMember.roles.has(newMember.guild.roles.array()) > 17) {
		if (newMember.roles.size == 1) {
			newMember.removeRole(`655728201586180166`);
		} else if (newMember.roles.size > 1) {
		newMember.addRole(`655728201586180166`);
		}
	} else if (newMember.roles.size == 1) {
	  	newMember.removeRole(`655728201586180166`);
	}
});*/

client.on('raw', async event => {
	if (!events.hasOwnProperty(event.t)) return;
	const { d: data } = event;
	const user = client.users.get(data.user_id);
	const channel = client.channels.get(data.channel_id);
	const message = await channel.fetchMessage(data.message_id);
	const member = message.guild.members.get(user.id);
	const emojiName = data.emoji.name;
	const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
	//const reaction = collected.first();
	const reaction = message.reactions.get(emojiKey);
	/* Hesap Onaylama */
	if (message.author.id === '302767242943135754' && (message.id === '655870914059305004')) { //Üye Rolü
		if (event.t === "MESSAGE_REACTION_ADD") {
			member.addRole(`655722224321298442`);
		} else {
			member.removeRole(`655722224321298442`);
		}
	}
	/* Ortak Duyurular */
	if (message.author.id === '302767242943135754' && (message.id === '655780009180397588')) { //Duyurular - Sözleşme - Ödeme
		if (event.t === "MESSAGE_REACTION_ADD") {
			if (emojiName === '📢') {
				member.addRole(`655719541875277840`);
			} else if (emojiName === '📜') {
				member.addRole(`655728024947261460`);
			}
		} else {
			if (emojiName === '📢') {
				member.removeRole(`655719541875277840`);
			} else if (emojiName === '📜') {
				member.removeRole(`655728024947261460`);
			}
		}
	}
	/* Yama Notları */
	if (message.author.id === '302767242943135754' && (message.id === '655780024997249024')) { //Yama Notları
		if (event.t === "MESSAGE_REACTION_ADD") {
			if (emojiName === '👑') {
				member.addRole(`655873825384300589`);
			} else if (emojiName === '💎') {
				member.addRole(`559692315883601927`);
			} else if (emojiName === '☣️') {
				member.addRole(`585205613110362128`);
			} else if (emojiName === '☁') {
				member.addRole(`559692392228323351`);
			} else {
				member.addRole(`559692235503828992`);
			}
		} else {
			if (emojiName === '👑') {
				member.removeRole(`655873825384300589`);
			} else if (emojiName === '💎') {
				member.removeRole(`559692315883601927`);
			} else if (emojiName === '☣️') {
				member.removeRole(`585205613110362128`);
			} else if (emojiName === '☁') {
				member.removeRole(`559692392228323351`);
			} else {
				member.removeRole(`559692235503828992`);
			}
		}
	}

	setTimeout(function(){
		const roleUpdates1 = message.guild.roles.find(r => r.name === "🔔 Flaversum");
		const roleUpdates2 = message.guild.roles.find(r => r.name === "🔔 Nidavellir");
		const roleUpdates3 = message.guild.roles.find(r => r.name === "🔔 NoHope");
		const roleUpdates4 = message.guild.roles.find(r => r.name === "🔔 Skyein");
		const roleUpdates5 = message.guild.roles.find(r => r.name === "🔔 Varoux");

		const roleAnnouncements = message.guild.roles.find(r => r.name === "🔔 Duyurular");
		const roleOther = message.guild.roles.find(r => r.name === "🔔 Genel");
		const headline = message.guild.roles.find(r => r.name === "⠀⠀⠀⠀⠀⠀⠀⠀⠀Abonelikler⠀⠀⠀⠀⠀⠀⠀");

		if (event.t !== "MESSAGE_REACTION_ADD") {
			if (message.id === '655780009180397588' || message.id === '655780024997249024') {
				if(headline) {
					//console.log(!message.guild.roles.find(r => r.name === "🔔 Güncellemeler Kaynağı"))
					if(roleUpdates1 !== true && roleUpdates2 !== true && roleUpdates3 !== true && roleUpdates4 !== true && roleUpdates5 !== true && roleAnnouncements !== true && roleOther !== true) {
						member.removeRole(`586582120265154598`);
					}
				}
			}
		} else {
			if (message.id === '655780009180397588' || message.id === '655780024997249024') {
				//console.log("ek1")
				if(roleUpdates1 !== false || roleUpdates2 !== false || roleUpdates3 !== false || roleUpdates4 !== false || roleUpdates5 !== false || roleAnnouncements !== false || roleOther !== false) {
					//console.log("ek2")
					if(headline !== true) {
						//console.log("ek3")
						member.addRole(`586582120265154598`);
					}
				}
			}
		}
	 }, 1000);
});

client.on('message', message => {
	/*if (!ticketbans[message.author.id]) ticketbans[message.author.id] = {
		banlevel: 0
	};
	let messageArray = message.content.split(" ");
	let cmd = messageArray[0];
	let args = messageArray.slice(1);
	if (message.content.toLowerCase().startsWith(`-ticketban`)) {
		if(!message.member.roles.has(`544105208783962114`)) return message.channel.reply(`Bu komutu kullanabilmek için gerekli izniniz yok.`);
		let ar = args[0];
		let ar2 = args[1];
		let userData = ticketbans[ar2];
		if (ar === "ekle") {
			message.channel.send(`${ar2} kimlikli kişi artık destek talebi açamayacak.`);
			userData.ticketbans++;
		} else if (ar === "çıkar" || ar === "cikar") {
			message.channel.send(`${ar2} kimlikli kişi tekrar destek talebi açma iznine sahip oldu.`);
			userData.ticketbans = 0;
		}
	}*/
	if (message.content.toLowerCase().startsWith(`-destek`) || message.content.toLowerCase().startsWith(`-oluştur`) || message.content.toLowerCase().startsWith(`-olustur`) || message.content.toLowerCase().startsWith(`-new`)) {
		//let userData = banlevel[message.author.id];
		const reason = message.content.split(" ").slice(1).join(" ");
		let allowedRole = message.guild.roles.find("name", "Susturulmuş: Destek");
		/*if(message.member.roles.has(`589765983128911925`)) {
			return message.channel.send(`Daha önceden yapılmış bir ihlal nedeniyle destek talebi açamıyorsunuz.`);
		}*/
		if (!message.channel.name.startsWith(`🤖`)) return message.channel.send(`Sistem, sadece komut kanalında çalıştırılabilir.`);
		if (message.guild.channels.exists("name", "🎫" + message.author.username)) return message.channel.send(`Halihazırda açık bir ticketiniz var.`);
		//if (userData.ticketbans >= 1) return message.channel.reply(`Daha önceden yapılmış bir ihlal nedeniyle destek talebi açamıyorsunuz.`);
		message.guild.createChannel(`🎫${message.author.username}`, 0).then(c => {
			c.setTopic(`${reason}`);
			let role = message.guild.roles.find("name", "Yetkili: Destek Görevlisi");
			let role2 = message.guild.roles.find("name", "@everyone");
			let role3 = message.guild.roles.find("name", "İnsan Kaynakları Yöneticisi");
			let role4 = message.guild.roles.find("name", "Yetkili: Adil Oyun Sağlayıcısı");
			c.overwritePermissions(role, {
				SEND_MESSAGES: true,
				READ_MESSAGES: true,
				MANAGE_CHANNELS: true,
				MANAGE_MESSAGES: true,
				ATTACH_FILES: true
			});
			c.overwritePermissions(role3, {
				SEND_MESSAGES: true,
				READ_MESSAGES: true,
				MANAGE_CHANNELS: true,
				MANAGE_MESSAGES: true,
				ATTACH_FILES: true
			});
			c.overwritePermissions(role4, {
				SEND_MESSAGES: true,
				READ_MESSAGES: true,
				MANAGE_CHANNELS: true,
				MANAGE_MESSAGES: true,
				ATTACH_FILES: true
			});
			c.overwritePermissions(role2, {
				SEND_MESSAGES: false,
				READ_MESSAGES: false,
				ATTACH_FILES: true
			});
			c.overwritePermissions(message.author, {
				SEND_MESSAGES: true,
				READ_MESSAGES: true,
				ATTACH_FILES: true
			});
			c.send({embed: {
				color: 3447003,
				author: {
					name: client.user.username,
					icon_url: client.user.avatarURL
				},
				title: `Destek talebi oluşturuldu! (@${message.author.username})`,
				url: "https://www.projects.gg/",
				description: "Destek talebini oluşturdunuz.\nBu kanalda sorununuzla ilgili bilgi veriniz.\nYetkilileri etiketlemeyiniz, en kısa zamanda sizinle ilgileneceğiz.\nSorununuz çözüldüğü zaman `-kapat` yazarak odayı kapatınız.",
				timestamp: new Date(),
				footer: {
					icon_url: client.user.avatarURL,
					text: "© PROJECTS"
				}
			}
			});
		});
		var embed = new Discord.RichEmbed()
		.setColor('#00FF00')
		.setTimestamp()
		//.setAuthor("Destek Talebi", message.guild.iconURL)
		//.setThumbnail(message.guild.iconURL)
		.addField("Destek talebin alındı:", "Senin adına en üst metin kanalında destek kanalı oluşturuldu.\nKanalı açıp sorunu bizimle paylaşabilirsin.")
		message.channel.send({embed: embed});
	}
	if (message.content.toLowerCase().startsWith(`-yardım`) || message.content.toLowerCase().startsWith(`-yardim`) || message.content.toLowerCase().startsWith(`-help`)) {
		var embed = new Discord.RichEmbed()
		.setColor('#00FF00')
		.setTimestamp()
		.setAuthor("Destek Talebi", message.guild.iconURL)
		.setThumbnail(message.guild.iconURL)
		.addField("Ne işe yarar?", "Oyuncu şikayetlerinizi, hata bildirimlerinizi, ödeme bildirimlerinizi destek talebi açıp bize ulaştırabilirsiniz.")
		.addField("Destek Kullanımı", "-oluştur **»** Yeni destek talebi açar.\n-kapat **»** Oluşturulan destek talebini kapatır.\n-ip **»** Sunucu IP'sini sohbete yazar.\n-siteler **»** PROJECTS servislerini gösterir.")
		message.channel.send({embed: embed});
	}
	if (message.content === '-ip') {
		var embed = new Discord.RichEmbed()
		.setColor('#00FF00')
		.addField("Kullanılabilir IP adreslerimiz:", "mc.projects.gg\noyna.projects.gg")
		.setImage(`https://mcapi.us/server/image?ip=mc.projects.gg&theme=dark`)
		//.setImage(`https://status.minecraftservers.org/classic/517604.png`)
		message.channel.send({embed: embed});
	}
	if (message.content === '-siteler') {
		var embed = new Discord.RichEmbed()
		.setColor('#00FF00')
		.addField("Projects servisleri:", "\n:e_mail: <https://dc.projects.gg/> **»** Discord anlık davet bağlantısı\n\n:small_red_triangle_down: <https://indir.projects.gg/> **»** Minecraft indirme konusu\n\n:tools: <https://bugs.projects.gg/> **»** Hata bildirme formu\n\n:briefcase: <https://app.projects.gg/> **»** Yetkili başvurusu formu\n\n:books: <https://wikiapp.projects.gg/> **»** Wiki takımı için başvuru formu\n\n:scroll: <https://terms.projects.gg/> **»** Sözleşme sayfası")
		//.setImage(`https://mcapi.us/server/image?ip=play.projectsurvivalmc.com&theme=dark`)
		//.setImage(`https://status.minecraftservers.org/classic/517604.png`)
		message.channel.send({embed: embed});
	}
	if (message.content.toLowerCase().startsWith(`-kapat`) || message.content.toLowerCase().startsWith(`-close`)) {
		if (!message.channel.name.startsWith(`🎫`)) return message.channel.send(`Bu komut yalnızca bir destek odasında kullanılabilir.`);
		message.channel.send(`Kanalı silmek istediğine eminsen **-onayla** yaz.`)
		.then((m) => {
			message.channel.awaitMessages(response => response.content === '-onayla', {
				max: 1,
				time: 10000,
				errors: ['time'],
			})
			.then((collected) => {
				message.channel.delete();
			})
			.catch(() => {
				m.edit('Kapatma onayının süresi doldu.').then(m2 => {
					m2.delete();
				}, 3000);
			})
		});
	}
});
client.login(process.env.bot_tokeni);
