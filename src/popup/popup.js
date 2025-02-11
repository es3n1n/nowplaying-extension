const BOT_URL = "https://t.me/playinnowbot?start=";

const YANDEX_TOKEN_KEY = "yandex-music-token";
const YANDEX_REQUEST_PAYLOAD = { action: "open_oauth" };

const SOUNDCLOUD_URL = "https://soundcloud.com";
const SOUNDCLOUD_COOKIE_NAME = "oauth_token";

const openBotTab = (prefix, startParam) => {
  chrome.tabs.create({ url: `${BOT_URL}${prefix}${startParam}` });
  closePopup();
};

const copyTextToClipboard = (text) => {
  if (!navigator.clipboard) {
    return false;
  }

  navigator.clipboard.writeText(text); // maybe we need to catch erros
  return true;
};

const closePopup = () => window.close();

const getYandexToken = (callback) => {
  chrome.storage.local.get([YANDEX_TOKEN_KEY], (result) =>
    callback(result[YANDEX_TOKEN_KEY])
  );
};

const requestYandexAuth = () =>
  chrome.runtime.sendMessage(YANDEX_REQUEST_PAYLOAD);

const getSoundCloudToken = (callback) => {
  chrome.cookies.get(
    { url: SOUNDCLOUD_URL, name: SOUNDCLOUD_COOKIE_NAME },
    (cookie) => callback(cookie?.value)
  );
};

const requestSoundCloudAuth = () => chrome.tabs.create({ url: SOUNDCLOUD_URL });

const clearStorage = () => {
  chrome.storage.local.set({ [YANDEX_TOKEN_KEY]: null });
  closePopup();
};

const processToken = ({ token, service, botUrlPrefix, requestAuth }) => {
  const button = document.getElementById(`${service}_button`);
  const copyToken = document.getElementById(`${service}_copy_token`);

  if (!token) {
    button.textContent = "Authorize";
    button.addEventListener("click", requestAuth);
    button.hidden = false;
    return;
  }

  button.textContent = "Go to the bot";
  button.addEventListener("click", () => openBotTab(botUrlPrefix, token));
  button.hidden = false;

  copyToken.hidden = false;
  copyToken.addEventListener("click", () => copyTextToClipboard(token));
};

const onLoad = () => {
  getYandexToken((token) =>
    processToken({
      token,
      service: "yandex",
      botUrlPrefix: "ym_",
      requestAuth: requestYandexAuth,
    })
  );

  getSoundCloudToken((token) =>
    processToken({
      token,
      service: "soundcloud",
      botUrlPrefix: "sc_",
      requestAuth: requestSoundCloudAuth,
    })
  );
};

onLoad();
