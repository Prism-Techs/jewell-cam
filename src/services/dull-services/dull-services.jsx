import instance from "../token-interceptor";

export const get_dull_master = () => { 
  return instance.get(`/dull/dull/`);
};
export const get_patterns = (dullid) => { 
  return instance.get(`/dull/patterns/?dullid=${dullid}`);
};
export const create_patterns = (data) => { 
  return instance.post(`/dull/patterns/`,data);
};
export const get_single_pattern = (id) => { 
  return instance.get(`/dull/patterns/${id}/`);
};