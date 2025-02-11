# nowplaying-extension

Extension for secure authorization of [@playinnowbot](https://t.me/playinnowbot) users in Telegram.

## Yandex Music

Uses OAuth of the official Yandex Music app which redirects to redirect_uri/Callback URI (music.yandex.ru) after login. The extension intercepts this redirect and extracts the token allowing it to be conveniently copied.

## SoundCloud

Allows you to conveniently extract the `oauth_token` from cookies.

## Acknowledgment

Thanks to [@MarshalX](https://github.com/MarshalX) and [@kiborg-samoubiytsa](https://github.com/kiborg-samoubiytsa) for the initial implementation of the Yandex Music token retrieval extension.

## License

MIT
