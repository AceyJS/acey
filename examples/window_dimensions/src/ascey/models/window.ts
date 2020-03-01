import { Model } from 'react-ascey'

const INITIAL_STATE = {
    width: 0,
    height: 0
}

class WindowModel extends Model {
    constructor(state = INITIAL_STATE){
        super(state)
    }

    public get width(){
        return this.get().width
    }

    public get height(){
        return this.get().height
    }

    public isXS = () => this.width < 520
    public isSM = () => this.width >= 520 && this.width < 720
    public isMD = () => this.width >= 720 && this.width < 960
    public isLG = () => this.width >= 960 && this.width < 1200
    public isXL = () => this.width >= 1200

    public getDimensionKey = () => {
        if (this.isXS()){
            return 'xs'
        } else if (this.isSM()){
            return 'sm'
        } else if (this.isMD()){
            return 'md'
        } else if (this.isLG()){
            return 'lg'
        }
        return 'xl'
    }


}

export default WindowModel