import BaseModel from "@/core/base/base-model";

import { ConfigInterface, ConfigKey } from "../interfaces/config-interface";

class ConfigModel extends BaseModel<ConfigInterface> {
  defaultValues: ConfigInterface = {
    key: ConfigKey.none,
    value: "",
  };

  fromJson(json: any): ConfigInterface {
    return {
      key: json.key,
      value: json.value,
    };
  }
  toJson(model: ConfigInterface): any {
    return {
      key: model.key,
      value: model.value,
    };
  }
}
const configModel = new ConfigModel();
export default configModel;
