// const domainPath = 'http://localhost:3001';
// const GetAPI = (path) => {
//     const promise = new Promise((resolve, reject) => {
//         fetch(`${domainPath}/${path}`)
//             .then(response => response.json())
//             .then((result) => {
//                 resolve(result);
//             }, (err) => {
//                 reject(err);
//             })
//     })
//     return promise;
// }

// const PostAPI = (path, data) => {
//     const promise = new Promise((resolve, reject) => {
//         fetch(`${domainPath}/${path}`, {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(data)
//         })
//             .then((result) => {
//                 resolve(result);
//             }, (err) => {
//                 reject(err);
//             })
//     })
//     return promise;
// }

// const DeleteAPI = (path, data) => {
//     const promise = new Promise((resolve, reject) => {
//         fetch(`${domainPath}/${path}/${data}`, {method: 'DELETE'})
//             .then((result) => {
//                 resolve(result);
//             }, (err) => {
//                 reject(err);
//             })
//     })
//     return promise;
// }

import GetAPI from './Get';
import PostAPI from './Post';
import DeleteAPI from './Delete';

const getNewsBlog = () => GetAPI('posts?_sort=id&_order=desc');
const postNewsBlog = (dataYgDikirim) => PostAPI('posts', dataYgDikirim);
const deleteNewsBlog = (dataYgDihapus) => DeleteAPI('posts', dataYgDihapus);

const getMahasiswa = () => GetAPI('posts?_sort=id&_order=desc');
const postMahasiswa = (dataYgDikirim) => PostAPI('posts', dataYgDikirim);
const deleteMahasiswa = (dataYgDihapus) => DeleteAPI('posts', dataYgDihapus);

const API = {
    getNewsBlog,
    postNewsBlog,
    deleteNewsBlog,

    getMahasiswa,
    postMahasiswa,
    deleteMahasiswa
}

export default API;