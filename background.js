sidebarProfiles = {
	twitter: "https://mobile.twitter.com",
	tweetdeck: "https://tweetdeck.twitter.com"
}

function changeProfile() {
	browser.storage.sync.get("tweetdeck").then((res) => {
		if (res.tweetdeck === true) {
			setSidebarAttributes(sidebarProfiles.tweetdeck)
		} else {
			setSidebarAttributes(sidebarProfiles.twitter)
		}
	});
}

function setSidebarAttributes(profile) {
	browser.sidebarAction.getPanel({}).then((value) => {
		if (value !== profile) {
			browser.sidebarAction.setPanel({panel: profile})
		}
	})
}

changeProfile();

browser.storage.onChanged.addListener(changeProfile);
