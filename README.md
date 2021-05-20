# Milchstrasse

Komm mit uns auf eine Reise zur Milchstrasse – von deiner Milchjugend.

In der Milchstrasse App findest Du lesbische, schwule, bi, trans, inter und ace Queers in deinem Alter und alle dazwischen und ausserhalb. Hier tummelt sich deine Community – sei ein Teil davon und starte durch im queeren Universum.

Auf der Milchstrasse kannst Du
• ein Profil anlegen und deiner Community zeigen, wer Du bist und was Dich interessiert.
• Dich mit deinen Freund*innen in Chats verbinden und neue Leute kennen lernen. Du kannst auch bestehenden Gruppenchats beitreten oder eigene gründen.
• eine queere Veranstaltung planen. Sei es ein queerer Lesenachmittag oder eine spontane Party – mit der Milchstrasse wissen deine Freund*innen immer, was läuft.
• Dir die queere Agenda anschauen und im dazugehörigen Chat Leute treffen die an die gleichen Events gehen wie du.

Tritt ein in unser queeres Universum und werde Teil der Milchstrasse. Mach Dir jetzt dein Profil und starte durch!

Who run the world? Queers!


## Download

### Milchstrasse Apps für Android und iOS
<a href="https://play.google.com/store/apps/details?id=ch.milchjugend.milchstrasse">
  <img alt="Download von Google Play" src="https://play.google.com/intl/en_us/badges/images/badge_new.png" height=43>
</a>
<a href="https://apps.apple.com/ch/app/milchstrasse/id1490430747">
  <img alt="Download von App Store" src="https://user-images.githubusercontent.com/7317008/43209852-4ca39622-904b-11e8-8ce1-cdc3aee76ae9.png" height=43>
</a>


## Eigene App für Milchstrasse erstellen

Follow the [React Native Getting Started Guide](https://facebook.github.io/react-native/docs/getting-started.html) for detailed instructions on setting up your local machine for development.

## How to run
- Clone repository and install dependencies:
    ```bash
    $ git clone git@github.com:RocketChat/Rocket.Chat.ReactNative.git
    $ cd Rocket.Chat.ReactNative
    $ yarn
    ```

- Run application
    ```bash
    $ npx react-native run-ios
    ```
    ```bash
    $ npx react-native run-android
    ```


## Engage with us
### Share your story
We’d love to hear about [your experience](https://survey.zohopublic.com/zs/e4BUFG) and potentially feature it on our [blog](https://rocket.chat/case-studies/?utm_source=github&utm_medium=readme&utm_campaign=community).

### Subscribe for Updates
Once a month our marketing team releases an email update with news about product releases, company related topics, events and use cases. [Sign up!](https://rocket.chat/newsletter/?utm_source=github&utm_medium=readme&utm_campaign=community)

- Run tests

```bash
$ npx detox test ./e2e/tests/onboarding --configuration ios.sim.release
$ npx detox test ./e2e/tests/room --configuration ios.sim.release
$ npx detox test ./e2e/tests/assorted --configuration ios.sim.release
```

## Storybook
- Open index.js

- Uncomment following line

```bash
import './storybook';
```

- Comment out following lines
```bash
import './app/ReactotronConfig';
import { AppRegistry } from 'react-native';
import App from './app/index';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
```

- Start your application again
