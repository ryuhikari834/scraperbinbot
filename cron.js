const config = require("./config");
const Telegram = require("telegraf/telegram");
const telegram = new Telegram(config.telegramBotToken);
const funcionesTweets = require("./tweets");

const scrape = () => {
	console.log("scrape")
	funcionesTweets.getLastTweetId(function (err, LastTweetId) {
		funcionesTweets.getRecentTweets(LastTweetId, function (err, tweets) {
			if (!tweets || err) { return }
			const newLastTweetId = Object.keys(tweets).length > 0 ? tweets[0].id : null;
			funcionesTweets.saveLastTweetId(newLastTweetId);
			tweets.forEach(function (tweet) {
				const mensaje =
					`
─────⊱◈『❄️』◈⊰─────
${tweet.texto}

By: @TheBeginOfTime
─────⊱◈『❄️』◈⊰─────
				`
				const botonera = [
					[
						{
							"text": "🌟Apoyanos Donandonos🌟",
							"url": `https://www.paypal.me/witheblack834`
						}
					],
					[
						{
							"text": `Namso-Gen`,
							"url": `https://namso-gen.com/`
						}
					]
				]

				telegram.sendMessage(
					config.channelUsername,
					mensaje,
					{
						reply_markup: { "inline_keyboard": botonera },
					}
				);
			});
		});
	});
}

module.exports = { scrape }
