import * as PIXI from 'pixi.js';

const app = new PIXI.Application(510, 674)
document.body.appendChild(app.view)

const bg = PIXI.Sprite.fromImage('assets/bg3.jpg')
app.stage.addChild(bg)


const plane = PIXI.Sprite.fromImage('assets/plane.png')
plane.x = 195
plane.y = 540
app.stage.addChild(plane)


const hp = PIXI.Sprite.fromImage('assets/hp.png')
hp.x = 5
hp.y = 10
app.stage.addChild(hp)


const score = new PIXI.Text("得分: 10000")
score.x = 320;
score.y = 10;
score.style.fill = "white"
app.stage.addChild(score)


const cloud = PIXI.Sprite.fromImage('assets/yun02.png')
cloud.y = 100
app.stage.addChild(cloud)

const exp = PIXI.Sprite.fromImage('assets/exp.png')
exp.x = 100
exp.y = 300
app.stage.addChild(exp)