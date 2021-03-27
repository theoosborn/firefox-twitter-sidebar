const sidebarToggle = '_execute_sidebar_action';

// Update UI and set value of textbox
async function updateUI() {
  let commands = await browser.commands.getAll();
  for (let command of commands) {
    if (command.name === sidebarToggle) {
      document.querySelector('#shortcut').value = command.shortcut;
    }
  }
  browser.storage.sync.get('tweetdeck').then((res) => {
    document.querySelector("#tweetdeck").checked = res.tweetdeck || false;
  });
}

function updateSettings(e) {
  browser.commands.update({
    name: sidebarToggle,
    shortcut: document.querySelector('#shortcut').value
  });
  browser.storage.sync.set({
    tweetdeck: document.querySelector("#tweetdeck").checked
  });
  e.preventDefault();
}

function resetSettings() {
  browser.commands.reset(sidebarToggle);
  browser.storage.sync.clear();
  updateUI();
}

// Update UI on page load
document.addEventListener('DOMContentLoaded', updateUI);

// Act on update and reset buttons
document.querySelector('#update').addEventListener('click', updateSettings);
document.querySelector('#reset').addEventListener('click', resetSettings);
