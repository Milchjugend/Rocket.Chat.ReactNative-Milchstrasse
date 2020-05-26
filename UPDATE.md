## Update Milchstrasse from forked repo
Pull the repo and checkout the `feature/single-server` branch.
```bash
git clone https://github.com/Milchjugend/Rocket.Chat.ReactNative.git
git checkout feature/single-server
```
Add the forked repo as an origin

```bash
git remote add rocket https://github.com/RocketChat/Rocket.Chat.ReactNative.git
```
Pull the updates from the forked repo:

```bash
git pull rocket feature/single-server
```
Fix all merge conflicts, switch to a new feature branch, commit and push the updates. Then create a pull request back onto `feature/single-server`