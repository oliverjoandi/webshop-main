// export on selleks, et saals seda hilejm importida
export class Item {
    constructor(
        public imgSrc: string,
        public title: string,
        public price: number,
        public category: string,
        public barcode: number,
        public producer: string,
        public description: string,
        public isActive: boolean
    ) {}
}

//  pangakonto: saab võtta ja lisada aga mitte otse väärtust panna (get ja set funktsioonid)
    // getImgSrc () {
    //     return this.imgSrc;
    // }

    // setImg () {

    // }
