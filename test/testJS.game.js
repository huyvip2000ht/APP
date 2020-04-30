var chai = require('chai');
var jsdom = require('mocha-jsdom')
expect = chai.expect;
should = chai.should();
assert = chai.assert;

var codeMarket = require('./../public/javascript/marketScreen');

describe('Test Game Market', () => {
    describe('Sum box Coin', () => {

        it('checksum True', () => {
            var box_coin = [2, 3, 3];
            expect(codeMarket.sumBoxCoin(box_coin)).to.equal(8);
        })
        it('checksum False', () => {
            var box_coin = [2, 3, 3];
            expect(codeMarket.sumBoxCoin(box_coin)).to.not.equal(7);
        })

    })
    describe('Collision', () => {
        it('CheckCollision True ', () => {
            var frame = {
                offsetTop: 100,
                offsetLeft: 100,
                offsetHeight: 100,
                offsetWidth: 100,
            }
            assert.equal(codeMarket.checkCollision(150, 150, frame), true);
        })
        it('CheckCollision False ', () => {
            var frame = {
                offsetTop: 100,
                offsetLeft: 100,
                offsetHeight: 100,
                offsetWidth: 100,
            }
            assert.equal(codeMarket.checkCollision(250, 150, frame), false);
        })
    })
    describe('load Data ', () => {
        var GameData = [{
            coins: [{ number: 1, left: 130, top: 270 }, { number: 7, left: 130, top: 450 },
                { number: 5, left: 230, top: 250 }, { number: 6, left: 230, top: 450 },
                { number: 3, left: 330, top: 450 }, { number: 4, left: 130, top: 350 }
            ],
            product: "lollipop"
        }]

        it('load Data True', () => {
            var res = {
                coins: [{ number: 1, left: 130, top: 270 }, { number: 7, left: 130, top: 450 },
                    { number: 5, left: 230, top: 250 }, { number: 6, left: 230, top: 450 },
                    { number: 3, left: 330, top: 450 }, { number: 4, left: 130, top: 350 }
                ],
                product: "lollipop"
            }
            var resFromFunc = codeMarket.loadData(GameData, 0);
            assert.equal(res.product && JSON.stringify(res.coins), resFromFunc.product && JSON.stringify(resFromFunc.coins))
        })
        it('load Data Fail', () => {
            var res = {
                coins: [{ number: 1, left: 130, top: 270 }, { number: 7, left: 130, top: 450 },
                    { number: 5, left: 230, top: 250 }, { number: 6, left: 230, top: 450 },
                    { number: 3, left: 330, top: 450 }, { number: 4, left: 130, top: 350 }
                ],
                product: "fail"
            }
            var resFromFunc = codeMarket.loadData(GameData, 0);
            var resTest = () => {
                return res.product === resFromFunc.product &&
                    JSON.stringify(res.coins) === JSON.stringify(resFromFunc.coins);
            }
            assert.equal(resTest(), false)
        })
    })
    describe('load Coin', () => {
        var $;
        jsdom({
            url: "http://localhost"
        })

        var coins = [{ number: 1, left: 130, top: 270 }, { number: 7, left: 130, top: 450 },
            { number: 5, left: 230, top: 250 }, { number: 6, left: 230, top: 450 },
            { number: 3, left: 330, top: 450 }, { number: 4, left: 130, top: 350 }
        ]

        it('load Coin true', function() {
            var tagListCoin = document.createElement('div')
            assert.equal(codeMarket.loadCoin(tagListCoin, coins), 6);
        })
        it('load Coin False', function() {
            var tagListCoin = document.createElement('div')
            expect(codeMarket.loadCoin(tagListCoin, coins)).not.equal(7)
        })
    })
    describe('load Tag HTML', () => {
        jsdom({
            url: "http://localhost"
        })
        it('load Tag true', () => {
            var tag = codeMarket.loadTag();
            expect(tag).to.have.all.
            keys('product', 'tagCoinList',
                'productNameTag', 'frame')
        })
        it('load Tag False', () => {
            var tag = codeMarket.loadTag();
            expect(tag).to.not.have.all.
            keys('product', 'tagCoinList',
                'productNameTag', 'name')
        })
    })
})

var codeUFO = require('./../public/javascript/UFOScreen')
describe('Test Game UFO', () => {
    jsdom({
        url: "http://localhost"
    })
    describe('load Tag', () => {
        it('load Tags true', () => {
            var tag = codeUFO.loadTag();
            expect(tag).to.have.all.keys('coinsTag')
        })
        it('load tag false', () => {
            var tag = codeUFO.loadTag();
            var length = Object.keys(tag).length;
            assert.equal(length == 0, false)
        })
    })
    describe('loadCoin', () => {
        var coins = [
            [{ id: 1, number: 1, position: { left: 50, top: 100 } }, { id: 2, number: 5, position: { left: 100, top: 300 } },
                { id: 3, number: 3, position: { left: 400, top: 350 } }, { id: 4, number: 2, position: { left: 500, top: 170 } },
                { id: 5, number: 5, position: { left: 700, top: 350 } }, { id: 6, number: 5, position: { left: 600, top: 50 } },
                { id: 7, number: 5, position: { left: 300, top: 180 } }, { id: 8, number: 7, position: { left: 300, top: 0 } },
                { id: 9, number: 8, position: { left: -100, top: 200 } }, { id: 10, number: 9, position: { left: 800, top: 150 } }
            ]
        ]
        it('load coin True', () => {
            var coinsTag = document.createElement("div");
            expect(codeUFO.loadCoin(coinsTag, 0, coins)).to.equal(10);
        })
        it('load coin True', () => {
            var coinsTag = document.createElement("div");
            expect(codeUFO.loadCoin(coinsTag, 0, coins)).to.not.equal(3);
        })
    })
    describe('Check Collision ', () => {
        var elem = {
            offsetLeft: 100,
            offsetTop: 100
        }
        it('check Collision True', () => {
            var otherElem = {
                offsetLeft: 150,
                offsetTop: 150
            }
            expect(codeUFO.checkCollision(elem, otherElem)).to.be.true;
        })
        it('check Collision False', () => {
            var otherElem = {
                offsetLeft: 200,
                offsetTop: 150
            }
            expect(codeUFO.checkCollision(elem, otherElem)).to.be.false;
        })
    })
    describe('Calculation Result from two number enter by user', () => {
        it('calculation true', () => {
            assert.equal(codeUFO.CalculationResult(3, 7), 10);
        })
        it('calculation false', () => {
            expect(codeUFO.CalculationResult(2, 7)).to.be.not.equal(10)
        })
    })
})