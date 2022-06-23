import * as PIXI from 'pixi.js';

class MyPIXI {
    private readonly app: PIXI.Application

    constructor(renderWidth: number, renderHeight: number) {
        this.app = new PIXI.Application()

        this.app.renderer = PIXI.autoDetectRenderer(renderWidth, renderHeight)// // 通过源码得知, 如果想要设置render size, 需要通过这种方式
    }

    public getApp(): PIXI.Application {
        return this.app
    }

    public getAppView(): HTMLCanvasElement {
        return this.app.view
    }

    public getAppStage(): PIXI.Container {
        return this.app.stage
    }

    public getAppTicker(): PIXI.ticker.Ticker {
        return this.app.ticker
    }

    public static createSpriteFromImage(path: string) {
        return PIXI.Sprite.fromImage(path)
    }

    public static createText(text: string): PIXI.Text {
        return new PIXI.Text(text)
    }

    public addChildToStage(child: PIXI.DisplayObject) {
        this.getAppStage().addChild(child)
    }

    public removeChildForStage(child: PIXI.DisplayObject) {
        this.getAppStage().removeChild(child)
    }

    public createSpriteAndAddToStage<T extends PIXI.Sprite>(newChild: T, setChildFunc?: (child: T) => void): T {
        if (setChildFunc) {
            setChildFunc(newChild)
        }
        this.addChildToStage(newChild)
        return newChild
    }
}

class MyPIXIApp {
    private readonly PIXI_PARAMS = {
        render: {
            width: 512,
            height: 768
        }
    }
    private readonly myPIXI: MyPIXI

    private gamePause: boolean

    private readonly bg: PIXI.Sprite
    private readonly plane: PIXI.Sprite
    private readonly pauseButton: PIXI.Sprite
    private readonly unPauseButton: PIXI.Sprite
    private readonly mask: PIXI.Sprite

    private fpsCount: number
    private readonly planeBullets: PIXI.Sprite[] = []


    constructor() {
        this.myPIXI = new MyPIXI(this.PIXI_PARAMS.render.width, this.PIXI_PARAMS.render.height)

        this.bg = this.myPIXI.createSpriteAndAddToStage(MyPIXI.createSpriteFromImage('assets/bg_01.png'), (child) => {
            child.width = 512
            child.height = 768
        })
        this.plane = this.myPIXI.createSpriteAndAddToStage(MyPIXI.createSpriteFromImage('assets/plane.png'), (child) => {
            child.width = 117
            child.height = 93
            child.anchor.set(0.5, 0.5)

            child.x = this.bg.width / 2
            child.y = this.bg.height / 2
        })
        this.pauseButton = this.myPIXI.createSpriteAndAddToStage(MyPIXI.createSpriteFromImage('assets/zanting.png'), (child) => {
            child.width = 50
            child.height = 51

            child.anchor.set(1, 1)

            child.x = this.bg.width
            child.y = this.bg.height
        })
        this.mask = MyPIXI.createSpriteFromImage('assets/mengban.png')
        const setMask = () => {
            this.mask.width = this.bg.width
            this.mask.height = this.bg.height

            this.mask.x = this.bg.x
            this.mask.y = this.bg.y

            this.mask.alpha = 0.8
        }
        setMask()

        this.unPauseButton = MyPIXI.createSpriteFromImage('assets/jixu.png')
        const setUnPauseButton = () => {
            this.unPauseButton.width = 172
            this.unPauseButton.height = 51

            this.unPauseButton.anchor.set(0.5, 0.5)

            this.unPauseButton.x = this.bg.width / 2
            this.unPauseButton.y = this.bg.height / 2
        }
        setUnPauseButton()

        this.fpsCount = 0
        this.gamePause = false
        this.drawStage()
    }

    private initGameGlobalTicker() {
        this.myPIXI.getAppTicker().add(() => {
            if (this.gamePause) {
                return
            }

            if (this.fpsCount % 60 / 2 == 0) { // 按照任务要求, 该处为每秒发射两发炮弹
                this.planeBullets.push(this.myPIXI.createSpriteAndAddToStage(MyPIXI.createSpriteFromImage('assets/bullet_1.png'), (child) => {
                    child.anchor.set(0.5, 0.5)
                    child.position.set(this.plane.x, this.plane.y)
                }))
            }
            this.planeBullets.forEach((bullet) => {
                bullet.y -= 5
            })
            if (this.planeBullets.length > 0 && this.planeBullets[0].y < 0 - this.planeBullets[0].height) {
                const bullet = (this.planeBullets.shift() as PIXI.Sprite)
                bullet.destroy()
            }
            this.fpsCount += 1
        })
    }

    private drawStage() {
        this.initGameGlobalTicker()

        this.bg.interactive = true
        this.bg.on('mousemove', (even: PIXI.interaction.InteractionEvent) => {
            if (this.gamePause) {
                return
            }
            const position = even.data.getLocalPosition(this.bg)// 获取事件的本地位置, 事件是鼠标触发的, 相对于bg的x和y坐标
            if (position.x <= this.bg.width && position.y <= this.bg.height) {
                this.plane.position.set(position.x, position.y)
            }
        })

        this.pauseButton.interactive = true
        this.pauseButton.on('click', () => {
            this.pauseGame()
        })
        this.unPauseButton.interactive = true
        this.unPauseButton.on('click', () => {
            this.unPauseGame()
        })
    }

    private pauseGame() {
        this.gamePause = true

        this.myPIXI.addChildToStage(this.mask)
        this.myPIXI.addChildToStage(this.unPauseButton)
    }

    private unPauseGame() {
        this.myPIXI.removeChildForStage(this.unPauseButton)
        this.myPIXI.removeChildForStage(this.mask)

        this.gamePause = false
    }

    public getView() {
        return this.myPIXI.getAppView()
    }
}

class Index {
    private readonly document: Document
    private readonly myPIXIApp: MyPIXIApp


    constructor(document: Document) {
        this.document = document
        this.myPIXIApp = new MyPIXIApp()
    }

    public show() {
        this.document.body.appendChild(this.myPIXIApp.getView())
    }
}

const index = new Index(document)
index.show()