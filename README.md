# 消灭病毒

消灭abc病毒游戏版本v2.0。

1. 修改浏览器窗口缩放导致的病毒块top坐标位置触发的逻辑bug，index.js中使用window.onresize = function(){winH = stage.offsetHeight;}实现。
2. 实现病毒下落速度越来越快的功能，分成三段不同的速度。
3. 对删除uiLayer.removeChild(document.querySelector('.warning'))元素做了保护，如果没有子节点则不删除。
4. 实现关卡功能，当分数到达2分时，本关结束。进入通关页面，选择下一关病毒下落速度（默认比上一关快25%，最高100%），按“进入下一关”按钮进下一关游戏。
5. 开发全程用git管理代码，分成master主分支和dev开发分支，最后dev分支的内容merge到主分支上，最新快照版本为V2.0，见附件。
6. 同时该游戏也通过git pages发布到互联网上，可在线玩。网址：https://kaicheng-zhang.github.io/kill-virus/
