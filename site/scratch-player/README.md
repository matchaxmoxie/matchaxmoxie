# 站内 Scratch 播放器（TurboWarp Scaffolding）

本站用 `@turbowarp/scaffolding` 的 **`scaffolding-min.js`**（约 1.8MB）在同域加载 `scratch-projects/*.sb3`，
绿旗 / 停止都在 matchaxmoxie 上跑。主路径不跳转 scratch.mit.edu / turbowarp.org。

音乐扩展若用到，min 版会向 `packagerdata.turbowarp.org` 拉音色；Miss Zhao 起步项目不含该扩展。
完整离线音乐包可换成 `scaffolding-with-music.js`（约 3.7MB）。

## 如何更新 / 重建

```bash
# 在临时目录拉取固定版本（勿用 latest）
npm pack @turbowarp/scaffolding@0.4.0
tar -xzf turbowarp-scaffolding-0.4.0.tgz
cp package/dist/scaffolding-min.js site/scratch-player/scaffolding-min.js
cp package/LICENSE site/scratch-player/LICENSE-scaffolding.txt
```

播放逻辑在 `site/scratch-player/player.js`；页面入口是 `site/scratch-play.html?project=jumping`。

许可：Mozilla Public License 2.0（见 `LICENSE-scaffolding.txt`）。与 Scratch Team / TurboWarp 无隶属关系。
