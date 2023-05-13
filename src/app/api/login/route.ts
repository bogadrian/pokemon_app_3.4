import { NextResponse } from 'next/server';

const users = [
  {
    name: 'adrian',
    email: 'adrian@pokemons.com',
    password: '1234',
    token: '123456'
  },
  {
    name: 'bogdan',
    email: 'bogdan@pokemons.com',
    password: '1234',
    token: '78910'
  }
];

export async function POST(request: Request) {
  const body = await request.json();
  const nameOrEmail = body.nameOrEmail;
  const password = body.password;

  const foundedUser = users.find(user => {
    return (
      (user.name === nameOrEmail || user.email === nameOrEmail) &&
      user.password === password
    );
  });

  if (foundedUser) {
    const response = NextResponse.json(
      { message: 'ok', user: foundedUser },
      { status: 200 }
    );

    response.cookies.set({
      name: 'token',
      value: foundedUser.token,
      //  httpOnly: true,
      maxAge: 60 * 60
    });

    return response;
  }

  const response = NextResponse.json({ message: 'ko', user: null });
  response.cookies.set({
    name: 'token',
    value: ''
    // httpOnly: true
  });

  return response;
}
