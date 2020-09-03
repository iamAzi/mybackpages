class Player {
    constructor(name) {
        this.name = name;
        this.cheapGirl = false;
        this.stupid = false;
        this.wc = 0;
        this.camera = 0;
        this.oneCup = 0;
        this.nose = 0;
    }

    getStatus() {
        return {
            wc: this.wc,
            camera: this.camera,
            oneCup: this.oneCup,
            nose: this.nose,
            cheapGirl: this.cheapGirl,
            stupid: this.stupid
        }
    }
    useNose() {
        if (this.nose > 0) {
            this.nose--;
        }
    }
    addNose() {
        this.nose++;
    }
    useWC() {
        if (this.wc > 0) {
            this.wc--;
        }
    }
    addWC() {
        this.wc++;
    }
    useCamera() {
        if (this.camera > 0) {
            this.camera--;
        }
    }
    addCamera() {
        this.camera++;
    }
    useOneCup() {
        if (this.oneCup > 0) {
            this.oneCup--;
        }
    }
    addOneCup() {
        this.oneCup++;
    }
    beCheapGirl() {
        this.cheapGirl = true;
    }
    cancelCheap() {
        this.cheapGirl = false;
    }
    beStupid() {
        this.stupid = true;
    }
    cancelStupid() {
        this.stupid = false;
    }
}

module.exports = Player;
