import { userLogin } from '../../apiCalls/callApi';
import { error } from '../../apiCalls/errorConstants';
import HttpStatus from 'http-status-codes';
import mockAxios from 'axios';

describe("LoginBox Component", () => {


  it("calls axios getCall and returns users", async () => {
    mockAxios.post.mockImplementationOnce(() => Promise.resolve({

            status: HttpStatus.OK

    }));

    // const login = userLogin({email: "abcd@123.com", password: "abc"})
    // .then(response => {
    //     expect(mockAxios.post).toHaveBeenCalledTimes(0);
    //     expect(response.status).toBe(HttpStatus.OK);
    //     expect(mockAxios.post).toHaveBeenCalledWith(true);
    // })
    // .catch(err => {});


  });

});


// import axios from 'axios';
// import moxios from 'moxios';
// import sinon from 'sinon';
// import { userLogin } from '../../apiCalls/callApi';
// import { postCall } from '../../apiCalls/services';


// //jest.mock('../../apiCalls/services');
// describe('mocking axios requests', function () {

//     describe('across entire suite', function () {

//         it('calls axios getCall and returns users', () => {
//             jest.unmock('../../apiCalls/services');
//             const services = require('../../apiCalls/services');
//             services.postCall = sinon.stub();
//             services.postCall.withArgs("users/login", {email: "abcd@123.com", password: "abc"}).returns(Promise.resolve({status: '200 OK'}));

//             // return userLogin({email: "abcd@123.com", password: "abc"})
//             // .then(response => {
//             //     expect(services.postCall).toHaveBeenCalledTimes(0);
//             // })
//             // .catch(() => {});
//             // })


//         })
//     })



// // export default {
// //     post: jest.fn((url, data) => Promise.resolve({response: {status: "200 OK"}}))
// // }
