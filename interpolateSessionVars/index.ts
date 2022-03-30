import { interpolate, IOptions, ISession } from './interpolate'

const value : string = 'Hi {firstname, how are you today';
const session : ISession =   { firstname: 'John' }
const options: IOptions = { leftDelimiter: '{', rightDelimiter: '}' }
console.table(interpolate(value, session, options));