sidebarProfiles = {
	twitter: {
		title: "Twitter",
		icons: {
			48: "icons/icon1_48.png",
			96: "icons/icon1_96.png"
		},
		url: "https://mobile.twitter.com"
	},
	tweetdeck: {
		title: "Tweetdeck",
		icons: {
			48: "icons/icon3_48.png",
			96: "icons/icon3_96.png"
		},
		url: "https://tweetdeck.twitter.com"
	}
}

function changeProfile(changes, areaName) {
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
		if (value !== profile.url) {
			browser.sidebarAction.setPanel({panel: profile.url})
			browser.sidebarAction.setTitle({title: profile.title})
			browser.sidebarAction.setIcon({path: profile.icons})
		}
	})
}

changeProfile();

browser.storage.onChanged.addListener(changeProfile);
