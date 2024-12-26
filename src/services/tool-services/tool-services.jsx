import instance from "../token-interceptor";

export const get_tool_library = () => { 
  return instance.get(`/tool/tool_library/`);
};