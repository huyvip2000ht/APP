# Test 
## Unit Test
### Tech
`mocha
chai
mocha-jsdom`
### run
`npm test`
### Description 
1. Test Suite
a) Test Game UFO
    - load Tag : Load thẻ khi bắt đầu vào game
    - loadCoin : Load coin khi bắt đầu chơi game và qua màn
    - Check Collision : kiểm tra va chạm
    - Calculation Result from two number enter by user : Kiểm tra kết quả người dùng nhập vào và kết quả đầu bài
b) Test Game Market
    - Sum box Coin : Kiểm tra tổng của 2 coin
    - Collision : Kiểm tra va chạm
    - load Data : load dữ liệu khi vào game
    - load Coin : loai coin khi vào màn chơi
    - load Tag HTML : Load các thẻ cần xứ lý
2. Code
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
    }

3. Kết quả
    <img src = "./UnitTestResult.PNG">



## E2E Test