export var mydata: any[] = [];

export const columns = ['id', 'body', 'postId'];

function fakeDb(id: string) {
  return fetch('https://my-json-server.typicode.com/typicode/demo/db', {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    })
    .then(res => res.json())
    .then(data => {
      /*接到request data後要做的事情*/
      return mydata = data.comments;
    })
    .catch(e => {
      /*發生錯誤時要做的事情*/
    });
}

export const service = {
  async getData() {
    return fakeDb('id');
  },
};
