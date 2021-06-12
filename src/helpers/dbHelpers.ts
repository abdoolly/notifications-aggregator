export const makeModelRepository = (injectionName: string, model: any) => {
  return {
    provide: injectionName,
    useValue: model,
  };
};