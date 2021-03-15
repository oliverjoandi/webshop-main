// export on selleks, et saals seda hilejm importida
export class Item {
    constructor(
        public imgSrc: string,
        public title: string,
        public price: number,
        public category: string
    ) {}
}

//  pangakonto: saab võtta ja lisada aga mitte otse väärtust panna (get ja set funktsioonid)
    // getImgSrc () {
    //     return this.imgSrc;
    // }

    // setImg () {

    // }
