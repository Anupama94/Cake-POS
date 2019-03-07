import mockAxios from 'jest-mock-axios';
import { postCall } from '../../apiCalls/services';


afterEach(() => {
    // cleaning up the mess left behind the previous test
    mockAxios.reset();
});

it('UppercaseProxy should get data from the server and convert it to UPPERCASE', () => {
 
    let catchFn = jest.fn(),
        thenFn = jest.fn(() => console.log("GETS HERE"));
 
    // using the component, which should make a server response
    
 
    postCall("users/login", {email: "abcd@123.com", password: "abc"})
        .then(thenFn)
        .catch(catchFn);
 
    // since `post` method is a spy, we can check if the server request was correct
    // a) the correct method was used (post)
    // b) went to the correct web service URL ('/web-service-url/')
    // c) if the payload was correct ('client is saying hello!')
    expect(mockAxios.post).toHaveBeenCalledWith("http://localhost:3001/users/login", {email: "abcd@123.com", password: "abc"});
 
    // simulating a server response
    let responseObj = { status: '200 OK!' };
    mockAxios.mockResponse(responseObj);
 
    // checking the `then` spy has been called and if the
    // response from the server was converted to upper case
   expect(thenFn).toHaveBeenCalledTimes(1);
 
    // catch should not have been called
    expect(catchFn).not.toHaveBeenCalled();
});