import instance from "../token-interceptor";

export const create_machine_setting = (data) => { 
    return instance.post(`/machine/machine/`,data);
  };
export const get_machine_setting_details = () => { 
    return instance.get(`/machine/machine/`);
  };