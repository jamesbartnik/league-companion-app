'use server';

export default async function test() {
  console.log('from the server');
  return {
    name: 'test',
    type: 'action',
  };
}
