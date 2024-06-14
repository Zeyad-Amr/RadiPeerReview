import sl from "./service-locator";
import ServiceKeys from "./service-keys";
//---------------------------------------------------------
import { ApiClient } from "@/core/api/index";


class AppServicesLocator {
    static init() {
        //* Exnternal Services --------------------------------------------------
        sl.registerFactory<ApiClient>(ServiceKeys.ApiClient, () => new ApiClient());
    }

}

export default AppServicesLocator;