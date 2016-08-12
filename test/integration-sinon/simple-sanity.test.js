describe('sanity test', function () {
    it('must have started and completed the test run', function () {
        expect(testrun).be.ok();
        expect(testrun.done.calledOnce).be.ok();
        expect(testrun.start.calledOnce).be.ok();
    });

    it('must resolve variable and send request', function () {
        var request = testrun.beforeRequest.getCall(0).args[2];

        expect(testrun.beforeRequest.calledOnce).be.ok(); // one request
        expect(request).be.ok();
        expect(request.url.toString()).eql('https://echo.getpostman.com/get?testvar=test-var-value');
        expect(request.method).be('GET');
    });

    it('must receive response with the query param sent', function () {
        var response = testrun.request.getCall(0).args[2];

        expect(testrun.request.calledOnce).be.ok(); // one request
        expect(response.json()).be.ok();
        expect(response.json().args).be.ok();
        expect(response.json().args).have.property('testvar', 'test-var-value');
    });
});
