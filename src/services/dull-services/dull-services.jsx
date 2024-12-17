import instance from "../token-interceptor";

export const get_dull_master = () => { 
  return instance.get(`/dull/dull/`);
};
export const get_patterns = (dullid) => { 
  return instance.get(`/dull/patterns/?dullid=${dullid}`);
};