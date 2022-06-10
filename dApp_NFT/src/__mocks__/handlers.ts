import { rest } from 'msw';

//mock data
export const Contract = {};
export const restHandlers = [
  rest.get('https://pokeapi.co/api/v2/pokemon', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(Contract));
  })
];
