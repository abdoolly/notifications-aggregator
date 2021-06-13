import { v4 as uuidv4 } from 'uuid';

export const makeModelRepository = (injectionName: string, model: any) => {
  return {
    provide: injectionName,
    useValue: model,
  };
};


export const generateUUID = () => {
  return uuidv4().split('-').join('');
};