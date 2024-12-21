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
export const create_design = (data) => { 
  return instance.post(`/dull/design/`,data);
};

export const get_designs = () => { 
  return instance.get(`/dull/design/`);
};
export const update_design = (id,data) => { 
  return instance.put(`/dull/design/${id}/`,data);
};